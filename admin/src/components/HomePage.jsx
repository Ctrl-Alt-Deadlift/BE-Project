
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import { green, blue, orange, red } from '@mui/material/colors';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';

const Homepage = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,340',
      icon: <TrendingUpIcon />,
      color: green[500],
    },
    {
      title: 'New Users',
      value: '1,245',
      icon: <GroupIcon />,
      color: blue[500],
    },
    {
      title: 'Orders',
      value: '532',
      icon: <ShoppingCartIcon />,
      color: orange[500],
    },
    {
      title: 'Performance',
      value: '89%',
      icon: <BarChartIcon />,
      color: red[500],
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome Back, Admin!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Here's an overview of your platform's performance today.
        </Typography>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4}  key={index}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
              <Avatar
                sx={{
                  bgcolor: stat.color,
                  marginRight: 2,
                }}
              >
                {stat.icon}
              </Avatar>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="medium">
                  {stat.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Placeholder for Graphs or Recent Activities */}
      <Box mt={4}>
        <Card sx={{ padding: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Activities
          </Typography>
          <Typography variant="body1" color="textSecondary">
            This section can be used to display graphs, logs, or other recent activities.
          </Typography>
          {/* You can integrate libraries like Chart.js or Recharts here for graphs */}
        </Card>
      </Box>
    </Box>
  );
};

export default Homepage;
