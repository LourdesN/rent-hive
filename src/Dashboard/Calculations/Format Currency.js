export const formatCurrency = value => 
    new Intl.NumberFormat("en-KE", 
    { 
        style: "currency", 
        currency: "KES", 
        minimumFractionDigits: 2 
    }).format(value)