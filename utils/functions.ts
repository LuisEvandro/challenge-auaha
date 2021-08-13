export function calculateInstallments(price: number, InstallmentsQty: number, promotinalPrice: any){
    let result = promotinalPrice ? ((price - promotinalPrice) / InstallmentsQty) : (price / InstallmentsQty)
    
    return result
}

export function validateEmail(email: string) {

    if(email.toLocaleLowerCase().includes("teste")){
        return false
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}