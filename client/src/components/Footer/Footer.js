import React from 'react';
import { Container, Grid, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Container style={{ background: 'linear-gradient(90deg, rgba(79,96,193,1) 0%, rgba(135,132,220,1) 35%, rgba(178,160,254,1) 100%)', padding: '5%', maxWidth: '100%', margin: '0', width: '100%' }}>
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom color='#fff'>About Us</Typography>
          <Typography variant="body2" color='#fff'>
            At Tata Invest, we are dedicated to helping you achieve your financial goals. With our expert team and innovative investment strategies, we strive to provide you with the best investment experience possible.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom color='#fff'>Quick Links</Typography>
          <ul style={{ listStyleType: 'none', padding: 0, color: '#fff' }}>
            <li>
              <Link href="/" underline="none" color="inherit">
                Home
              </Link>
            </li>
            <li>
              <Link href="/aboutus" underline="none" color="inherit">
                About
              </Link>
            </li>
            <li>
              <Link href="#" underline="none" color="inherit">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" underline="none" color="inherit">
                Investment Plans
              </Link>
            </li>
            <li>
              <Link href="/aboutus" underline="none" color="inherit">
                Contact Us
              </Link>
            </li>
          </ul>
        </Grid>
        {/* Contact Info Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom color='#fff'>Contact Info</Typography>
          <Typography variant="body2" color="#fff">
            +1 (123) 456-7890
            <br />
            info@tatainvest.com
            <br />
            123 Financial Street, New York, NY 10001
          </Typography>
        </Grid>
        {/* Follow Us Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom color='#fff'>Follow Us</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <i className='fa fa-instagram'></i>
            <i className='fas fa-instagram'></i>
            <i className='fas fa-instagram'></i>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ margin: '30px 0' }} />
      <Typography variant="body2" color="textSecondary" align="center">
        &copy; {new Date().getFullYear()} Tata Invest. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
