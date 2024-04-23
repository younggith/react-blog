import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {CardActionArea} from '@mui/material'

interface CardProps {
  title: string
  subTitle: string
}

const CardComponent = ({title, subTitle}: CardProps) => {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardComponent
