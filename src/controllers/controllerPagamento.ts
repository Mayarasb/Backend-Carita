import { Request, Response } from 'express';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import dotenv from 'dotenv';


dotenv.config();

// 🔧 Inicializa a SDK
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});

export class PaymentController {
  // 📦 Criação de preferência (Checkout Pro)
  static async createPreference(req: Request, res: Response): Promise<void> {
    try {
        
        const { title, price } = req.body;

      const preference = new Preference(client);
      const body = {
        items: [
            {
                id: 'item-001', // ✅ Campo obrigatório agora
                title: title || 'Doação',
                unit_price: Number(price) || 10,
                quantity: 1,
                currency_id: 'BRL', // ✅ recomendável incluir também
            },
        ],
    back_urls: {
        success: 'http://localhost:4200/success',
        failure: 'http://localhost:4200/failure',
        pending: 'http://localhost:4200/pending',
    },
    auto_return: 'approved',
    };

      const response = await preference.create({ body });
      res.status(200).json({ id: response.id });
    } catch (error) {
      console.error('❌ Erro ao criar preferência:', error);
      res.status(500).json({ error: 'Erro ao criar preferência' });
    }
  }

  // 💳 Consulta de pagamento
  static async getPayment(req: Request, res: Response): Promise<void> {
    try {
      const { payment_id } = req.params;

      const payment = new Payment(client);
      const response = await payment.get({ id: Number(payment_id) });

      res.status(200).json(response);
    } catch (error) {
      console.error('❌ Erro ao consultar pagamento:', error);
      res.status(500).json({ error: 'Erro ao consultar pagamento' });
    }
  }
}

export default PaymentController;
