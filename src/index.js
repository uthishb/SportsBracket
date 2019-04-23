import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import './index.css';

import image1 from "./images/duke.jpg";
import image2 from "./images/virginiatech.png";
import image3 from "./images/lsu.png"
import image4 from "./images/michiganstate.png"
import image5 from "./images/gonzaga.png";
import image6 from "./images/floridastate.png";
import image7 from "./images/texastech.jpg"
import image8 from "./images/michigan.png"
import image9 from "./images/virginia.png";
import image10 from "./images/oregon.jpg";
import image11 from "./images/purdue.jpg"
import image12 from "./images/tennessee.png"
import image13 from "./images/northcarolina.png";
import image14 from "./images/auburn.jpg";
import image15 from "./images/houston.png"
import image16 from "./images/kentucky.jpg"


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16]

const teams = [
  {
    "name" : "Duke",
    "logo" : image1
  },
  {
    "name" : "Virginia Tech",
    "logo" : image2
  },
  {
    "name" : "Lousiana State",
    "logo" : image3
  },
  {
    "name" : "Michigan State",
    "logo" : image4
  },
  {
    "name" : "Gonzaga",
    "logo" : image5
  },
  {
    "name" : "Florida State",
    "logo" : image6
  },
  {
    "name" : "Texas Tech",
    "logo" : image7
  },
  {
    "name" : "Michigan",
    "logo" : image8
  },
  {
    "name" : "Virginia",
    "logo" : image9
  },
  {
    "name" : "Oregon",
    "logo" : image10
  },
  {
    "name" : "Purdue",
    "logo" : image11
  },
  {
    "name" : "Tennessee",
    "logo" : image12
  },
  {
    "name" : "North Carolina",
    "logo" : image13
  },
  {
    "name" : "Auburn",
    "logo" : image14
  },
  {
    "name" : "Houston",
    "logo" : image15
  },
  {
    "name" : "Kentucky",
    "logo" : image16
  },
]

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: 140,
    width: 100  
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class UniversityLogos extends React.Component {  
  
  results = []
  newTeams = []  
  currentTeams = []
  totalGames = 0;

  constructor(props) {
    super(props);
    this.state = {currentGame:1, firstTeam: this.props.teams[0], secondTeam: this.props.teams[1], imageView:true, resultView:false};
    this.currentTeams = this.props.teams;
    this.totalGames = this.currentTeams.length-1;        
  }

  switchImage() {    
    this.state.currentGame++;            
    if(this.state.currentGame <= this.currentTeams.length/2) {
      this.setState({firstTeam: this.currentTeams[this.state.currentGame*2-2], secondTeam: this.currentTeams[this.state.currentGame*2-1]});   
    } 
    else {                 
      this.currentTeams = this.newTeams;      
      this.newTeams = []                   
      this.setState({currentGame:1, firstTeam: this.currentTeams[0], secondTeam: this.currentTeams[1], imageView:true, resultView:false});
    }
  }

  addResult(team) {        
    this.newTeams.push(team);            
    let currentStage = "";
    if(this.currentTeams.length == 16)
      currentStage = "Sweet Sixteen";
    else if(this.currentTeams.length == 8)
      currentStage = "Quarter Finals";
    else if(this.currentTeams.length == 4)
      currentStage = "Semi Finals";
    else if(this.currentTeams.length == 2)
      currentStage = "Finals";
    this.results.push({game: this.state.firstTeam.name + " vs " + this.state.secondTeam.name, winner: team.name, stage: currentStage});
  }

  render() {
    if(this.currentTeams.length > 1) {
      return (
        <div>        
          <Grid container spacing={24} alignItems="flex-end" direction="row" justify="center">
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <Paper>
                <Image
                  src={this.state.firstTeam.logo}                  
                  onClick={() => {this.addResult(this.state.firstTeam); this.switchImage()}}                
                />
                <h1 className="typography_header">{this.state.firstTeam.name}</h1>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <Paper>
                <Image
                  src={this.state.secondTeam.logo}
                  onClick={() => {this.addResult(this.state.secondTeam); this.switchImage()}}
                />
                <h1 className="typography_header">{this.state.secondTeam.name}</h1>
              </Paper>
            </Grid>
          </Grid>                        
        </div>
      );
    }
    else {
      let id = 0;
      function createData(game, winner) {
        id += 1;        
        return { id, game, winner};
      }

      const rows = [];

      this.results.forEach(function (result, index) {        
        rows.push(createData(result["game"], result["winner"]))
      });

      let sweetSixteen = []
      this.results.forEach(function (result, index) {
        if(result["stage"] == "Sweet Sixteen")
          sweetSixteen.push(createData(result["game"], result["winner"]))
      });

      let quarterFinals = []
      this.results.forEach(function (result, index) {
        if(result["stage"] == "Quarter Finals")
          quarterFinals.push(createData(result["game"], result["winner"]))
      });

      let semiFinals = []
      this.results.forEach(function (result, index) {
        if(result["stage"] == "Semi Finals")
          semiFinals.push(createData(result["game"], result["winner"]))
      });

      let finals = []
      this.results.forEach(function (result, index) {
        if(result["stage"] == "Finals")
          finals.push(createData(result["game"], result["winner"]))
      });

      return(
        <div>
          <h1 className="typography_header">Predictions</h1>
          <h1 className="typography_header">Sweet Sixteen</h1>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="right">Winner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sweetSixteen.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.game}
                    </TableCell>
                    <TableCell align="right">{row.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <h1 className="typography_header">Quarter Finals</h1>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="right">Winner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quarterFinals.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.game}
                    </TableCell>
                    <TableCell align="right">{row.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <h1 className="typography_header">Semi Finals</h1>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="right">Winner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {semiFinals.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.game}
                    </TableCell>
                    <TableCell align="right">{row.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <h1 className="typography_header">Finals</h1>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Game</TableCell>
                  <TableCell align="right">Winner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {finals.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.game}
                    </TableCell>
                    <TableCell align="right">{row.winner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>      
        </div>
      );
    }    
  }
}

ReactDOM.render(
  <UniversityLogos classes={styles} images={images} teams={teams}/>,
  document.getElementById('root')
);
