class IdeasContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ideas: [],
      editingIdeaId: null, 
      notification: ''
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewIdea = this.addNewIdea.bind(this)
    this.updateIdea = this.updateIdea.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    this.resetNotification = this.resetNotification.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteIdea = this.deleteIdea.bind(this)
    
    
   /* this.resetNotification = this.resetNotification.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteFruit = this.deleteFruit.bind(this)
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this) */
    
  }
  
  handleUpdate(idea){
    fetch(`/api/v1/ideas/${idea.id}`, 
    {
      method: 'PUT',
      body: JSON.stringify({idea: idea}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        this.updateIdea(idea)
      })
  }
  
  updateIdea(idea){
    let newIdeas = this.state.ideas
    const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    newIdeas[ideaIndex] = idea
    this.setState({
    ideas: newIdeas,
    notification: 'All changes saved'
})
}
  
  
  handleDelete(id){
    fetch(`/api/v1/ideas/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        this.deleteIdea(id)
      })
  }
  

  
   addNewIdea(idea){
    this.setState({
      ideas: [idea].concat(this.state.ideas),
      editingIdeaId: idea.id
    })
  }
  
  componentDidMount(){
    fetch('/api/v1/ideas.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ ideas: data }) });
  }
  

  
  handleFormSubmit(){
    let body = JSON.stringify({idea: {title:"", body: ""} })
  fetch('/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((idea)=>{
      this.addNewIdea(idea)
    })
    
  }

 
  
  enableEditing(id) {
    this.setState({editingIdeaId: id}, function(){ this.title.focus() })
  
}
  
   resetNotification() {
  this.setState({notification: ''})
}
  
 deleteIdea(id){
     newIdeas = this.state.ideas.filter((idea) => idea.id !== id)
     this.setState({
       ideas: newIdeas
    })
  }

render() {
  return (
    
    <div>
      <div>
        <button onClick={this.handleFormSubmit} className="newIdeaButton">
         New Idea
        </button>
        
         <span className="notification">
          {this.state.notification}
        </span>
        
      </div>
      
      {this.state.ideas.map((idea) => {
        
          if(this.state.editingIdeaId === idea.id) {
    return(<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} titleRef= {input => this.title = input} resetNotification={this.resetNotification} />)
  } else {
    return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing} onDelete={this.handleDelete} />)
  }        
      })}
    </div>
  );
}
 
  }

  