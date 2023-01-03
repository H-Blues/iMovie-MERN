import { React, useState } from 'react';
import { Avatar, Modal, Stack, Typography } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Button, Card, CardActions, CardContent, Container } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOneUser } from '../../api/customApi';
import './Profile.css';

const Profile = () => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const { favouriteLength } = useSelector((state) => state.favourites);
  const { reviewLength } = useSelector((state) => state.reviews);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const confirmDelete = async () => {
    handleClose();
    if (!userInfo.id) toast.error('No userId passed');
    else {
      const response = await deleteOneUser(userInfo._id);
      if (response.success) {
        toast.success('Delete account success');
        setTimeout(function () {
          window.location.href = '/';
        }, 3000);
      } else {
        toast.error(response.msg);
      }
    }
  };

  return (
    <>
      {isAuthenticated && (
        <Container className="profile-wrapper">
          <div className="profile">
            <div className="profile-image">
              <Avatar alt={userInfo.username} src={userInfo.pic} sx={{ width: 150, height: 150 }} />
            </div>
            <h1 className="profile-username">{userInfo.username || 'User'}</h1>
            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">{favouriteLength}</span> favourites
                </li>
                <li>
                  <span className="profile-stat-count">{reviewLength}</span> reviews
                </li>
              </ul>
            </div>
            <List className="profile-info">
              <ListItem disablePadding>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={`Email: ${userInfo.email} `} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={`Phone: ${userInfo.phone} `} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={`Address: ${userInfo.address}`} />
              </ListItem>
            </List>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Button
                component={Link}
                to="/account/setting"
                variant="contained"
                startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button
                onClick={handleOpen}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Stack>
          </div>

          <Modal
            open={open}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto',
              width: '55%',
            }}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Card
              sx={{
                minWidth: '55%',
                padding: '20px',
                borderRadius: '10px',
              }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Are you sure you want to delete this account ?
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={confirmDelete}>
                  Confirm
                </Button>
                <Button size="small" onClick={handleClose}>
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default Profile;
