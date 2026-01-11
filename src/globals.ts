abstract class Globals {
    public imagesUrl:string;
    public messagingUrl:string;
    public phone:string;
    // public typesUrl:string;
}

class DevelopmentGlobals extends Globals {
    public messagingUrl = "http://localhost:3000/api/messaging/whatsapp/template";
    // public typesUrl = "http://localhost:3000/api/appointment-types/";
    public imagesUrl = "http://localhost:3000/api/images/";
    public phone = "972584006014"
}


class ProductionGlobals extends Globals {
    public messagingUrl = "https://vento-motors-back.onrender.com/api/messaging/whatsapp/template";
    public imagesUrl = "https://vento-motors-back.onrender.com/api/images/";
    // public typesUrl = "https://api.ez-lines.com/api/appointment-types/";
    public phone = "972584006014"
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;
