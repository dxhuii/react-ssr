import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions  from '../store/actions/anime';
import {Link} from 'react-router-dom';
import {Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import  '../assets/css/my.scss'

class Anime extends Component{
  state = {
    hasError: false,
    weekEng: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    weekDay: new Date().getDay() - 1,
    weekCn: ['一', '二', '三', '四', '五', '六', '日'],
  }
  componentDidMount(){
    this.props.getAnime()
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // 在这里可以做异常的上报
    console.log('发送错误', error, info)
  }
  render(){
    const { weekDay, weekCn, weekEng } = this.state
    const { animeInfo } = this.props;
    console.info(animeInfo)
    return (
      <div>
        <Helmet>
          <title>My Home</title>
          <meta name="description" content="Helmet application" />
          <meta name="keywords" content="Helmet,application" />
        </Helmet>
        {
					weekCn.map((week, index) => <li key={week}>{week}
						{
							(animeInfo[weekEng[index]] || []).map(item => <p key={item.id}>{item.id}</p>)
						}
					</li>)
        }
        <Link to='/user'>User</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  animeInfo: state.animeInfo,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAnime: actions.getAnime,
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Anime)
