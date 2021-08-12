export function calculateInstallments(price: number, InstallmentsQty: number, promotinalPrice: any){
    let result = promotinalPrice ? ((price - promotinalPrice) / InstallmentsQty) : (price / InstallmentsQty)
    
    return result
}