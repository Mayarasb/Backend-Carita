export interface Evento {
  id: number;           
  title: string;          
  start: string;       
  end?: string;        
  description?: string;    
  address?: string;    
  idParceiro?: number;  
  idOrganizacao?: number; 
}