import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import Box from '@material-ui/core/Box';

const Footer = () => {
    return (
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" to="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    )
  }
  export default Footer;