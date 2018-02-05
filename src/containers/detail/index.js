import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Link } from 'react-router-dom';

class Detail extends Component {
  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    // 在这里可以做异常的上报
    console.log('发送错误', error, info)
  }
  render(){
    const { id } = this.props.match.params
    return (
      <Layout title="My Anime" description="anime body" keywords="anime, acg">
        { id }
        <Link to='/anime'>Anime</Link>
      </Layout>
    )
  }
}

export default Detail
