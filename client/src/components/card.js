import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cardcomponent({el}) {
  
  return (
    <center  >
      <Card sx={{ maxWidth: 700 }}>
    { el.img? ( 
      <CardMedia
        sx={{ height: 300 }}
        image={el.img}
        title={el.title}
      />):  (<iframe width="560" height="315"  src={el.ved}/>)}
    
      <CardContent style={{ backgroundColor: 'grey'}}>
        
        <Typography gutterBottom variant="h5" component="div">
          {el.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {el.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </center>
  );
}