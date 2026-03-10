import Account from "../account/account";

const titleChecking = "Argent Bank Checking (x8349)";
const titleSavings = "Argent Bank Savings (x6712)";
const titleCreditCard = "Argent Bank Credit Card (x8349)";
const amountChecking = "$2,082.79";
const amountSavings = "$10,928.42";
const amountCreditCard = "$184.30";
const descriptChecking = "Available Balance";
const descriptSaving = "Available Balance";
const descriptCreditCard = "Current Balance";

function Accounts() {
    return (
        <>
            <h2 className='sr-only'>Accounts</h2>
            <Account title={titleChecking} amount={amountChecking} description={descriptChecking} />
            <Account title={titleSavings} amount={amountSavings} description={descriptSaving} />
            <Account title={titleCreditCard} amount={amountCreditCard} description={descriptCreditCard} />
        </>
    )
}

export default Accounts;