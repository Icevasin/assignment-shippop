function Hello(firstname,lastname) {
   if(typeof firstname === 'string' && typeof lastname === 'string') {
        if(firstname === "Shippop"){
                console.log("Best Online Shipping Platform");
            }else {
                console.log(`Hello Shippop, My name is ${firstname} ${lastname}`);
            }
   }else {
        console.log("Please input your firstname and lastname");
    }
       
}

Hello("Vasin","Hiran")
Hello("Shippop","Hiran")

