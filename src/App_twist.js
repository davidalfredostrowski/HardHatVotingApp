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


	        this.setState( { johnnyVote : parseInt(number) } )

        }

    constructor(props){
        super(props)
        this.state = {
            account: '',
            johnnyVote: 0,
            amberVote: 0,
	    loading: true
	}
	console.log("constructor")
    }

	//       this.vote = this.vote.bind(this)
  //  }
  //  vote =()=> {

//	var identity = 'Johnny'
//        this.state.contract.methods.voteForCandidate(identity).send({gas: 140000, from: this.state.account });
//        console.log("voteForCandidate")
//	var count = this.state.contract.methods.totalVotesFor(identity).call();
//	console.log('just before the count')
//	console.log(count.toString)
 //	var num = count.toString
//	console.log(num)
//	this.setState( (prevState) => ({  johnnyVote: prevState.johnnyVote + 1}));
  //      var b;
 //       var count2 = this.state.contract.methods.totalVotesFor('Johnny').call().then(function (f) { b = f});
//console.log(count2)

//        const output2 =    this.state.contract.methods.totalVotesFor('Johnny').call()
//        console.log(output2)

// }

}
      const voting4 = async (greeting) =>  {
        this.state.contract.methods.voteForCandidate(greeting).send({gas: 140000, from: this.state.account });
        console.log("voteForCandidate")
        var count = await this.state.contract.methods.totalVotesFor(greeting).call(console.log);
        console.log('take a look at this !!!!!!!', count)
        this.setState( { amberVote: parseInt(count) } )
 }
	render(){

        return (
            <>
                <div>
         
    <button onClick={() => voting4('Amber')}>Send 'Hello'</button>
       </div>
                <h5>Johnny count: {this.state.johnnyVote}</h5>
                <h5>Amber count: {this.state.amberVote}</h5>
            </>
        );
    }



}

export default App;
