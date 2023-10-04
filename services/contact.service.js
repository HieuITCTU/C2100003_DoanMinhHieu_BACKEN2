class ContactService{
    //Dinh nghia ca phuong thuc truy xuat CSDL su dung MongoDB API
    extractConactData(payload){
        const contact = {
        name: payload.name,
        emailL: payload.email,
        address: payload.address,
        phone:payload.phone,
        favorite:payload.favorite,
    };
    // remove undefined fields
    Objects.keys(contact).forEach(
        (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
}
async create(payload){

    const contact = this.extractConactData(payload);
    const result = await this.Contact.findOneAndUpdate(
        contact,
        {$set: {favorite: contact.favorite===true}},
        {returnDocument: "after", upsert: true}
    );
    return result.value;
}
}