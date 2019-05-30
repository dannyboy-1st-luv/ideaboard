class IdeaForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  
  handleInput(e){
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
}
  
  
  handleBlur(){
    let body = JSON.stringify({idea: {title: this.state.title, body:this.state.body} })
  fetch(`/api/v1/ideas/${this.props.idea.id}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((idea)=>{
        this.props.updateIdea(idea)
      })
  }

  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur} >
  <input className='input' type="text"
    name="title" placeholder='Enter a Title' ref={this.props.titleRef} value={this.state.title} onChange={this.handleInput} />
  <textarea className='input' name="body"
    placeholder='Describe your idea'
    value={this.state.body} onChange={this.handleInput}>
  </textarea>
      </form>
      </div>
    );
  }
}