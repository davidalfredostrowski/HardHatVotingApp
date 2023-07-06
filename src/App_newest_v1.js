import React, {Component} from 'react'
import Web3 from 'web3'
import VotingAbi from './contractsData/Voting.json'
import VotingAddress from './contractsData/Voting-address.json'

class App extends Component {
    componentWillMount(){
        this.loadBlockchainData()
    }

async loadBlockchainData(){
    console.log('VotingAddress.address', VotingAddress.address)
    console.log('VotingAbi.abi', VotingAbi.abi)
    let NewHelloAbi = require('./contractsData/Voting.json');
    const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-34-222-177-70.us-west-2.compute.amazonaws.com:8545"))
    var account;
    const accounts  = await web3.eth.getAccounts()
    console.log(accounts)
    web3.eth.getAccounts().then((f) => {
        account = f[0];
    })

    this.setState( { account : accounts[0] })
    console.log(account);
    const contract = new web3.eth.Contract(VotingAbi.abi);
    contract.options.address = VotingAddress.address
    this.setState( { contract })
    let myCandidateList = await  contract.methods.getCandidateList().call();  
    console.log(myCandidateList);   
const number = await contract.methods.totalVotesFor('Johnny').call(console.log)
    console.log("Johnny number: ", number)    


}

    constructor(props){
        super(props)
        console.log("constructor")
        this.state = {
            account: '',
            loading: true,
            message: ''
        }
   //  this.junk  = this.junk.bind(this) 
     this.voting4 = this.voting4.bind(this)

    }

    setHandler = (event) => {
          event.preventDefault();
          console.log('sending ' + event.target.setText.value + ' to the contract');
          this.state.contract.methods.voteForCandidate('Johnny').send({ gas: 3000000, from: this.state.account });
     }

  // junk = (event) => {
          //event.preventDefault();
    //      console.log('sending ' + event.target.setText.value + ' to the contract');
      //    this.state.contract.methods.voteForCandidate('Amber').send({ gas: 3000000, from: this.state.account });
    // }


      voting4 = async (greeting) =>  {
        this.state.contract.methods.voteForCandidate(greeting).send({gas: 140000, from: this.state.account });
        console.log("voteForCandidate")
        var count = await this.state.contract.methods.totalVotesFor(greeting).call(console.log);
        console.log('take a look at this !!!!!!!', count)
        this.setState( { [greeting]: parseInt(count) } )
 }




  //  getCurrentVal = async () => {
  //        let val = await this.state.contract.methods.getInteger("one").call(console.log);
  //        console.log("val", val)
  //        this.setState( { message : val.toString() })
  //  }



render(){

        return (
                <div>
                <h5>message output: {this.state.message}</h5>
                <h4> {"Get/Set Contract interaction"} </h4>
                        <form onSubmit={this.setHandler}>
                                <input id="setText" type="text"/>
                                <button type={"submit"}> Update Contract </button>
                        </form>
                        <div>
                        <button onClick={this.getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>
 <button onClick={() => this.voting4("Amber")}>Send 'crunkers Hello'</button>

 <button onClick={() => this.voting4("Johnny")}>Send 'Johnny Hello'</button>



		</div>
                


   <h5>Johnny count: {this.state.Johnny}</h5>
                <h5>Amber count: {this.state.Amber}</h5>



		</div>
        );
}
}

export default App;
