import Feature from "../feature/feature";

import srcImgChat from "../../assets/images/icon-chat.webp";
import srcImgMoney from "../../assets/images/icon-money.webp";
import srcImgSecure from "../../assets/images/icon-security.webp";

const altImgChat = "Chat Icon";
const altImgMoney = "Money Icon";
const altImgSecure = "Security Icon";
const titleChat = "You are our #1 priority";
const titleMoney = "More savings means higher rates";
const titleSecure = "Security you can trust";
const descriptChat = "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.";
const descriptMoney = "The more you save with us, the higher your interest rate will be!";
const descriptSecure = "We use top of the line encryption to make sure your data and money is always safe.";

function Features() {
    return (
        <section className="features">
            <h2 className='sr-only'>Features</h2>
            <Feature srcImg={srcImgChat} altImg={altImgChat} title={titleChat} description={descriptChat} />
            <Feature srcImg={srcImgMoney} altImg={altImgMoney} title={titleMoney} description={descriptMoney} />
            <Feature srcImg={srcImgSecure} altImg={altImgSecure} title={titleSecure} description={descriptSecure} />
        </section>
    )
}

export default Features;