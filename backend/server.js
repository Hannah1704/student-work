import express from "express";
import { MongoClient } from "mongodb"; 
import { ObjectId } from 'mongodb';

const app = express();
const session = require('express-session');
const port = 3000;

const uri = "mongodb+srv://u23587832:ofeuuAAI8omG4bBI@playlistdatabase.bi7gp.mongodb.net/?retryWrites=true&w=majority&appName=PlaylistDatabase";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Middleware 
app.use(express.json()); 
app.use(express.static("frontend/public"));

// session - user can log in 
app.use(session({
    secret: 'mySuperSecretKey123!', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

async function startServer() 
{
    try 
    {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("myDatabase");

        app.use((req, res, next) => {
            req.db = db; 
            next();
        });


        // -----------------------------------------------------------------------------------------
        // PLAYLISTS  

        // add remove
        app.put('/api/playlists/:playlistId', async (req, res) => {
            const { playlistId } = req.params;
            const { name, description } = req.body; // Modify these as per your requirements
        
            try {
                const result = await req.db.collection('playlists').updateOne(
                    { _id: new ObjectId(playlistId) },
                    { $set: { name, description } } // Update other fields as necessary
                );
        
                if (result.modifiedCount === 1) {
                    res.status(200).send("Playlist updated successfully.");
                } else {
                    res.status(404).send("Playlist not found or no changes made.");
                }
            } catch (err) {
                res.status(500).send("Error updating playlist.");
            }
        });
        
        // READ: all playlists  -- it works!
        app.get('/api/playlists', async (req, res) => {
            try
            {
                const playlists = await req.db.collection('playlists').find().toArray();
                res.status(200).send(playlists);
            }
            catch(err)
             {
                res.status(500).send("Error fetching playlists");
            }
        });


        // CREATE: new playlist -- updated version with final version of playlists
        app.post('/api/playlists', async (req, res) => {
            try 
            {
                const { name, songs, category, description, coverImage, hashtags } = req.body; 
                const playlistCollection = req.db.collection('playlists');

                const newPlaylist = {
                    name,
                    songs,
                    category,
                    description,
                    coverImage,
                    hashtags: hashtags || [], 
                    createdAt: new Date(), 
                };
                
                const result = await playlistCollection.insertOne(newPlaylist);
                res.status(201).json(result.insertedId);   
            } 
            catch(error) 
            {
                console.error('Error inserting playlist:', error.message); 
                res.status(500).send('Internal Server Error');
            }
        });


        // READ: specific playlist -- works by returning the entire playlist back
        app.get('/api/playlists/:id', async (req, res) => {
            const { id } = req.params;
            try
            {
                const playlist = await req.db.collection('playlists').findOne({ _id: new ObjectId(id) });
                if(!playlist)
                {
                    return res.status(404).send("Playlist not found");
                }
                res.status(200).send(playlist);
            } 
            catch(err) 
            {
                res.status(500).send("Error fetching playlist (playlist may not exist)");
            }
        });

        // PUT: update specific playlist name
        app.put('/api/playlists/:id', async (req, res) => {
            const { id } = req.params;
            const { name } = req.body; 

            try 
            {
                const result = await req.db.collection('playlists').updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { name: name } }
                );

                if(result.matchedCount === 0)
                {
                    return res.status(404).send("Playlist not found");
                }

                res.status(200).send("Playlist name updated successfully");
            } 
            catch(err)
            {
                res.status(500).send("Error updating playlist");
            }
        });


        // DELETE: specific playlist -- works -- deletes specific playlist 
        app.delete('/api/playlists/:id', async (req, res) => {
            const { id } = req.params;
            try
            {
                const result = await req.db.collection('playlists').deleteOne({ _id: new ObjectId(id) });
                if(result.deletedCount === 0) 
                {
                    return res.status(404).send("Playlist not found");
                }
                res.status(200).send("Playlist deleted successfully");
            } 
            catch(err)
            {
                res.status(500).send("Error deleting playlist");
            }
        });


        // --------------------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------------------

        // USERS
        // CREATE: a new user - now likedsongs and playlists
        app.post('/api/users', async (req, res) => {
            try 
            {
                const {
                    username,
                    password,
                    followerCount,
                    pronouns,
                    bio,
                    socialMedia,
                    followings,
                    likedSongs,
                    personalPlaylists
                } = req.body;
        
                const userCollection = req.db.collection('users');
        
                const newUser = {
                    username,
                    password,
                    followerCount: followerCount || { "$numberInt": "0" },
                    pronouns: pronouns || "",
                    bio: bio || "",
                    socialMedia: socialMedia || [],
                    followings: followings || [],
                    likedSongs: likedSongs || [],  
                    personalPlaylists: personalPlaylists || []  
                };
        
                const result = await userCollection.insertOne(newUser);
                res.status(201).json(result.insertedId);
        
            } 
            catch(error) 
            {
                console.error('Error inserting user:', error.message);
                res.status(500).send('Internal Server Error');
            }
        });
        

        // READ: all users -- works perfectly
        app.get('/api/users', async (req, res) => {
            try 
            {
                const users = await req.db.collection('users').find({}, { projection: { username: 1, bio: 1, followings: 1 } }).toArray();
                res.status(200).send(users);
            } 
            catch(err) 
            {
                res.status(500).send("Error fetching users");
            }
        });


        // READ: specific user -- works perfectly
        app.get('/api/users/:id', async (req, res) => {
            const userId = req.params.id;
            try 
            {
              const user = await User.findById(userId); 
              if (!user) return res.status(404).send('User not found');
              res.json(user);
            } 
            catch(error) 
            {
              res.status(500).send('Error fetching user');
            }
          });
          

        // UNFOLLOW: user
        app.post('/api/users/unfollow', async (req, res) => {
            const { friendId } = req.body;
            const currentUserId = req.user.id; 
          
            try 
            {
              await User.updateOne(
                { _id: currentUserId },
                { $pull: { followings: friendId } } 
              );
              res.sendStatus(200);
            } 
            catch(error) 
            {
              res.status(500).send('Error unfollowing user');
            }
          });
          

        // DELETE: specific user
        app.delete('/api/users/:id', async (req, res) => {
            const { id } = req.params;

            try
             {
                const result = await req.db.collection('users').deleteOne({ _id: new ObjectId(id) });

                if(result.deletedCount === 0)
                {
                    return res.status(404).send("User not found");
                }

                res.status(200).send("User deleted successfully");
            } 
            catch (err)
            {
                console.error('Error deleting user:', err);
                res.status(500).send("Error deleting user");
            }
        });

        // -----------------------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------

        //SONGS 
        // ADDING A SONG TO LIKED LIST
        app.put('/api/users/:userId/likeSong', async (req, res) => {
            try {
                const { userId } = req.params;
                const { songId } = req.body;  
        
                if(!songId)
                {
                    return res.status(400).send('Song ID is required');
                }
        
                const userCollection = req.db.collection('users');
                
                const updateResult = await userCollection.updateOne(
                    { _id: new ObjectId(userId) },  
                    { $push: { likedSongs: songId } }  
                );
        
                if(updateResult.modifiedCount === 0) 
                {
                    return res.status(404).send('User not found or song already liked');
                }
        
                res.status(200).send('Song added to likedSongs');
        
            }
            catch(error)
            {
                console.error('Error liking song:', error.message);
                res.status(500).send('Internal Server Error');
            }
        });
    
        // LIKING A SONG
        app.post('/api/likes', async (req, res) => {
            try {
              const userId = req.userId; 
              const { songId } = req.body;
          
              if(!songId) 
              {
                console.error('Song ID is missing in the request');
                return res.status(400).json({ success: false, message: 'Song ID is required' });
              }
          
              const user = await User.findById(userId);
              if(!user) 
              {
                console.error(`User not found: ${userId}`);
                return res.status(404).json({ success: false, message: 'User not found' });
              }
          
              if(!user.likedSongs.includes(songId)) 
              {
                user.likedSongs.push(songId);
                await user.save();
              }
          
              console.log(`Song liked: ${songId} by user: ${userId}`);
              return res.json({ success: true, songId });
            } 
            catch(error) 
            {
              console.error('Error in /api/likes:', error);
              return res.status(500).json({ success: false, message: 'Internal server error' });
            }
          });
          
       // READ: all songs -- works
        app.get('/api/songs', async (req, res) => {
            try 
            {
                const songs = await req.db.collection('songs').find().toArray();
                res.status(200).send(songs);
            } 
            catch(err)
            {
                res.status(500).send("Error fetching songs");
            }
        });

        // CREATE SONG NEW
        app.post('/api/songs', async (req, res) => {
            try {
              const { title, artist, duration, link, date } = req.body;
              const songCollection = req.db.collection('songs');
          
              const newSong = {
                title,
                artist,
                duration,
                link,
                date,
              };
          
              const result = await songCollection.insertOne(newSong);
              res.status(201).json(result.insertedId);
            } 
            catch(error) 
            {
              console.error('Error inserting song:', error.message);
              res.status(500).send('Internal Server Error');
            }
          });
          

        // READ: specific song 
        app.get('/api/songs/:id', async (req, res) => {
            const { id } = req.params;
            try 
            {
                const song = await req.db.collection('songs').findOne({ _id: new ObjectId(id) });
                if(!song)
                {
                    return res.status(404).send("Song not found");
                }
                res.status(200).send(song);
            } 
            catch(err)
            {
                res.status(500).send("Error fetching song (song may not exist)");
            }
        });

        // UPDATE: specific song
        app.put('/api/songs/:id', async (req, res) => {
            const { id } = req.params;
            const { title, artist, duration } = req.body;
            try 
            {
                const result = await req.db.collection('songs').updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { title, artist, duration } }
                );
                if(result.modifiedCount === 0) 
                {
                    return res.status(404).send("Song not found or no changes made");
                }
                res.status(200).send("Song updated successfully");
            } 
            catch(err) 
            {
                res.status(500).send("Error updating song");
            }
        });

        // DELETE: specific song
        app.delete('/api/songs/:id', async (req, res) => {
            const { id } = req.params;
            try 
            {
                const result = await req.db.collection('songs').deleteOne({ _id: new ObjectId(id) });
                if(result.deletedCount === 0)
                {
                    return res.status(404).send("Song not found");
                }
                res.status(200).send("Song deleted successfully");
            } 
            catch (err) 
            {
                res.status(500).send("Error deleting song");
            }
        });

        // -----------------------------------------------------------------------------------------
        // -----------------------------------------------------------------------------------------

        // LOGIN
        app.post('/api/login', async (req, res) => {
            const { username, password } = req.body;
        
            try 
            {
                const userCollection = req.db.collection('users');
                const user = await userCollection.findOne({ username });
        
                if(!user) 
                {
                    return res.status(404).send('User not found');
                }
        
                if(user.password !== password) 
                {
                    return res.status(401).send('Invalid password');
                }
        
                req.session.user = {
                    _id: user._id,
                    username: user.username,
                };
        
                res.status(200).json(user);
            } 
            catch(error) 
            {
                res.status(500).send('Error logging in');
            }
        });
        

        // CREATE: SIGNUP
        app.post('/api/users', async (req, res) => {
            try 
            {
                const { username, password, followerCount } = req.body;
                const userCollection = req.db.collection('users'); 

                const existingUser = await userCollection.findOne({ username });
                if(existingUser)
                {
                    return res.status(400).send('Username already exists.');
                }

                const newUser = {
                    username,
                    password,  
                    followerCount,
                };

                const result = await userCollection.insertOne(newUser);
                res.status(201).json(result.insertedId);

            } 
            catch(error)
            {
                console.error('Error inserting user:', error.message);
                res.status(500).send('Internal Server Error');
            }
        });

        // LOGOUT 
        app.post('/api/logout', (req, res) => {
            req.session.destroy(err => {
              if(err) 
                {
                    return res.status(500).send('Logout failed');
                }
              res.status(200).send('Logged out successfully');
            });
          });

        
        // --------------------------------------------------------------------------------------------------------
        // HOME PAGE 

        // SEARCH: updated version
        app.get('/api/search', async (req, res) => {
            const searchTerm = req.query.q;
            console.log('Search term:', searchTerm);
        
            try 
            {
                if(!searchTerm) 
                {
                    return res.status(400).json({ error: 'No search term provided' });
                }
        
                const playlists = await req.db.collection('playlists').find({
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                        { genre: { $regex: searchTerm, $options: 'i' } },
                        { hashtags: { $regex: searchTerm, $options: 'i' } }
                    ]
                }).toArray();
        
                const songs = await req.db.collection('songs').find({
                    $or: [
                        { title: { $regex: searchTerm, $options: 'i' } },
                        { hashtags: { $regex: searchTerm, $options: 'i' } }
                    ]
                }).toArray();
        
                const users = await req.db.collection('users').find({
                    $or: [
                        { username: { $regex: searchTerm, $options: 'i' } },
                        { bio: { $regex: searchTerm, $options: 'i' } }
                    ]
                }).toArray();
        
                const results = [...playlists, ...songs, ...users];
                res.json(results);
            } 
            catch(error) 
            {
                console.error('Search error:', error);
                res.status(500).json({ error: 'An error occurred during search' });
            }
        });
        

        // SONG FEED COMPONENT 
        app.get('/api/songs/:id', async (req, res) => {
            const songId = req.params.id;
          
            try 
            {
              const song = await req.db.collection('songs').findOne({ _id: new ObjectId(songId) });
              if(song)
              {
                res.json(song);
              } 
              else 
              {
                res.status(404).json({ error: 'Song not found' });
              }
            }
            catch(error)
            {
              console.error('Error fetching song:', error);
              res.status(500).json({ error: 'An error occurred while fetching the song' });
            }
          });

        // Get the liked songs for a specific user by user ID
        app.get('/api/users/:id/likedSongs', async (req, res) => {
            try 
            {
            const userId = req.params.id;
            const userCollection = req.db.collection('users');

            const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        
            if(!user) 
            {
                return res.status(404).send('User not found');
            }
        
            const likedSongIds = user.likedSongs || [];
        
            if(likedSongIds.length === 0) 
            {
                return res.json({ likedSongs: [] });
            }
        
            const songCollection = req.db.collection('songs');
            const likedSongs = await songCollection.find({ _id: { $in: likedSongIds.map(id => new ObjectId(id)) } }).toArray();
        
            res.json({ likedSongs });
            } 
            catch(error)
            {
            console.error('Error fetching liked songs:', error);
            res.status(500).send('Internal Server Error');
            }
        });

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
        // PROFILE PAGE 

        // profile picture
        app.post('/api/user/updateProfilePicture', async (req, res) => {
            const { userId, profilePicture } = req.body;
        
            try
            {
            const user = await User.findById(userId);
            if(!user) 
            {
                return res.status(404).json({ message: 'User not found' });
            }
        
            user.profilePicture = profilePicture; 
            await user.save(); 
        
            res.status(200).json({ message: 'Profile picture updated successfully' });
            } 
            catch(error) 
            {
            console.error('Error updating profile picture:', error);
            res.status(500).json({ message: 'Internal server error' });
            }
        });
  


        // friend requests for non-followed friends
        app.post('/api/get-potential-friends', async (req, res) => {
            const { followings } = req.body;
          
            try 
            {
              const potentialFriends = await db.collection('users').find({
                _id: { $nin: followings.map(id => new ObjectId(id)) }
              }).toArray();
          
              res.json(potentialFriends);
            } 
            catch(error) 
            {
              console.error('Error fetching potential friends:', error);
              res.status(500).json({ error: 'Error fetching potential friends' });
            }
          });

          // GET /api/users/:id
        app.get('/api/users/:id', async (req, res) => {
            const userId = req.params.id;
            
            try {
            const user = await User.findById(userId).select(
                'username pronouns followerCount bio followings createdPlaylists'
            ).populate('createdPlaylists');
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            res.json(user);
            } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ message: 'Server error' });
            }
        });

        // PUT /api/users/:userId/unfollow
        app.put('/api/users/:userId/unfollow', async (req, res) => {
            try {
            const { unfollowUserId } = req.body;
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { followings: unfollowUserId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
            } catch (error) {
            console.error('Error unfollowing user:', error);
            res.status(500).json({ error: 'Failed to unfollow user' });
            }
        });
  
  
  
          
// *********************************************************************************

        // Update bio and pronouns
        app.put('/api/users/:id', async (req, res) => {
            const { id } = req.params;
            const { bio, pronouns } = req.body;
        
            try 
            {
                await req.db.collection('users').updateOne(
                { _id: new ObjectId(id) },
                { $set: { bio, pronouns } }
            );
                res.status(200).send("User details updated successfully.");
            } 
            catch(err) 
            {
                res.status(500).send("Error updating user details.");
            }
        });
        
        app.put('/api/users/:id/password', async (req, res) => {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;
        
            try 
            {
            const user = await req.db.collection('users').findOne({ _id: new ObjectId(id) });
        
            if(user && user.password === oldPassword)
            {
                await req.db.collection('users').updateOne(
                { _id: new ObjectId(id) },
                { $set: { password: newPassword } }
                );
                res.status(200).send("Password updated successfully.");
            } 
            else
            {
                res.status(400).send("Old password does not match.");
            }
            } 
            catch(err) 
            {
                res.status(500).send("Error updating password.");
            }
        });

        
        // GET: user profile by username
        app.get('/api/users', async (req, res) => {
            try 
            {
                const username = req.query.username; 
                const userCollection = req.db.collection('users');
                
                const user = await userCollection.findOne({ username });
                
                if(!user) 
                {
                    return res.status(404).send('User not found');
                }

                const { password, ...userData } = user;
                res.json(userData);
            } 
            catch(error) 
            {
                console.error('Error fetching user:', error);
                res.status(500).send('Internal Server Error');
            }
        });


        // Start server
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`);
        });

    } 
    catch(err) 
    {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); 
    }
}

startServer();


