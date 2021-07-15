import '../App.css';
import {connect} from "react-redux";
import {Component, Fragment} from "react";
import {handleInitialData} from "../actions/shared";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AnswerQuestion from "./AnswerQuestion";
import ShowQuestion from "./ShowQuestion";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import {LoadingBar} from "react-redux-loading-bar";
import Authentication from "./Authentication";

class App extends Component{
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(handleInitialData())
    }

    render() {
        const {authedUser} = this.props
        return (
            <Router className="App">
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        <Nav />
                        <hr className='hr'/>
                        {
                            this.props.loading ?
                                null :
                                <div>
                                    {
                                       authedUser === null && <Route path='/' exact component={Authentication} />
                                    }
                                    {
                                        authedUser !== null && <Route path='/' exact component={Dashboard} />
                                    }
                                    <Route path='/add' component={NewQuestion} />
                                    <Route path='/questions/:question_id' exact component={ShowQuestion} />
                                    <Route path='/questions/:question_id/answer' component={AnswerQuestion} />
                                    <Route path='/leaderboard' component={LeaderBoard} />
                                </div>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ users, authedUser }){
    return {
        authedUser,
        loading: users.length < 1
    }
}

export default connect(mapStateToProps)(App);
