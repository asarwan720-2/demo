/* ================= WALLET.JS ================= */

const walletUser = JSON.parse(
  localStorage.getItem("user")
);

/* Supabase connection */
const walletClient = supabase.createClient(
  "https://katbdbzoufiblnnsoxkk.supabase.co",
  "sb_publishable_--fdpQMmSlUyt2ywjUErgQ_LXGvQH-a"
);


/* ================= LOGIN CHECK ================= */

if (!walletUser || !walletUser.id) {

  console.log("User login information not found.");

}


/* ================= LOAD WALLET ================= */

async function loadWallet(){

  if (!walletUser || !walletUser.id)
    return;


  try{

    const { data, error } =
      await walletClient
        .from("login")
        .select("id,balance")
        .eq("id", walletUser.id)
        .single();


    if(error){

      console.error(
        "Wallet error:",
        error.message
      );

      return;
    }


    if(!data)
      return;


    /* ================= BALANCE ================= */

    const balance =
      data.balance ?? 0;


    /*
      Agar page par #userId element
      available hai to balance show hoga.
    */

    const userIdElement =
      document.getElementById("userId");


    if(userIdElement){

      userIdElement.innerText =
        "💰 ₹" + balance;

    }


    /*
      Agar page par #balance element
      available hai to usme bhi balance show hoga.
    */

    const balanceElement =
      document.getElementById("balance");


    if(balanceElement){

      balanceElement.innerText =
        "₹" + balance;

    }


    /*
      Agar page par #walletBalance element
      hai to usme bhi balance show hoga.
    */

    const walletBalanceElement =
      document.getElementById(
        "walletBalance"
      );


    if(walletBalanceElement){

      walletBalanceElement.innerText =
        "₹" + balance;

    }

  }
  catch(error){

    console.error(
      "Wallet loading failed:",
      error
    );

  }

}


/* ================= WALLET PAGE ================= */

function openWallet(){

  window.location.href =
    "wallet.html";

}


/* ================= START ================= */

loadWallet();


/*
  Balance ko 60 seconds mein
  dobara read karega.
*/

setInterval(
  loadWallet,
  60000
);
