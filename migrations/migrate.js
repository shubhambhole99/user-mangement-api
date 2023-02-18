const migrate = require('mongoose-migrate');
const User = require('../models/userSchema')

// Define the migrations for the User model
const migrations = [
    {
        version: 1,
        description: 'Initial migration',
        async up() {
            await User.createCollection();
            await User.createIndexes();
        },
        async down() {
            await User.collection.drop();
        }

    },
    {
        version: 2,
        description: 'Add updatedAt field',
        async up() {
            await User.updateMany({}, { $set: { updatedAt: Date.now() } });
        },
        async down() {
            await User.updateMany({}, { $unset: { updatedAt: '' } });
        },
    },
]

// Run the migrations
migrate({ mongoose: require('mongoose') })
    .load(schema, migrations)
    .up((err) => {
        if (err) console.error(err);
        else console.log('Migrations completed successfully');
        process.exit();
    });
