let web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));

// 블록있으면 테이블에 넣기.
function getBalance() {
     const list = web3.eth.accounts;
     let input = '<table border>';
     let total = 0;

     $('#tablePlace').empty();

     for (el of list) {
          const tempB = parseFloat(web3.fromWei(web3.eth.getBalance(el), 'ether'));
          input += `<tr>
                    <td>${el}</td>
                    <td>${tempB} Eth</td>
                    </tr>`;
          total += tempB;
     };

     $('#tablePlace').html(input);

     makeSelect()
}

function makeSelect() {
     const list = web3.eth.accounts;
     $('#accounts').empty();
     $('#receiver').empty();
     for (el of list) {
          $('#accounts').append($('<option>').html(el));
          $('#receiver').append($('<option>').html(el));

     }
}

function send() {
     const address = $('#accounts').val();
     const toAddress = $('#receiver').val();
     const amount = web3.toWei($('#amount').val(), 'ether');
     const pass = $('#pass').val();

     if (web3.personal.unlockAccount(address, pass)) {
          web3.eth.sendTransaction({
                    from: address,
                    to: toAddress,
                    value: amount
               },
               () => {
                    getBalance();
               }
          )
     }
}

function createNewAccount() {
     web3.personal.newAccount($('#txt.account').val());
     web3.eth.filter('latest').watch(() => { // filter:블록생성을 감지. latest:새로생성된 블럭을 모니터 -> watch()에 getBalance생성
          getBalance();
     })
}