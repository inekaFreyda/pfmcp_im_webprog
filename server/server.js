const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const memberRoutes = require('./routes/memberRoutes');
const addressRoutes = require('./routes/addressRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

app.use('/auth', authRoutes);
app.use('/event', eventRoutes);
app.use('/member', memberRoutes);
app.use('/address', addressRoutes);
app.use('/organization', organizationRoutes);
app.use('/attendance', attendanceRoutes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
