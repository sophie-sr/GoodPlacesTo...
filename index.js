import express from 'express'
import bcrypt from 'bcrypt'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'
import dotenv from 'dotenv'
import passport from 'passport'
import initialize from './user-config.js'
import path from 'path'

if (process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: '.env' });
}

const app = express()


const users = []


initialize (
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.use("/styles",express.static("/views"));

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport. initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/login',  (req, res) => {
    res.render('login.ejs')
});

app.get('/home', (req, res) => {
    res.render('index.ejs')
});

app.get('/waterFountains', (req, res) => {
    res.render('waterFountains.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login', 
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})


app.delete('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

app.post('/waterFountains', (req, res, next) => {
    const request = req.body;
    let markerName = request.hiddenName;

    if (request.rate1) {
        fountains[markerName].total = fountains[markerName].total + 1;
        fountains[markerName].rating = (fountains[markerName].rating + 1) / 2;
    } else if (request.rate2) {
        fountains[markerName].total = fountains[markerName].total + 1;
        fountains[markerName].rating = (fountains[markerName].rating + 2) / 2;
    } else if (request.rate3) {
        fountains[markerName].total = fountains[markerName].total + 1;
        fountains[markerName].rating = (fountains[markerName].rating + 3) / 2;
    } else if (request.rate4) {
        fountains[markerName].total = fountains[markerName].total + 1;
        fountains[markerName].rating = (fountains[markerName].rating + 4) / 2;
    } else if (request.rate5) {
        fountains[markerName].total = fountains[markerName].total + 1;
        fountains[markerName].rating = (fountains[markerName].rating + 5) / 2;
    }

    res.redirect('/waterFountains');

})

function checkAuthenticated (req,res,next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated (req,res,next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});

const fountains = {
    marker1: {
        coords: {
            lat: 48.46212825453619, 
            lng: -123.31790950732885
        },
        content: 'Visual Arts Department',
        rating: 5,
total: 1
    },
    marker2: {
        coords: {
            lat: 48.46201349822746, 
            lng: -123.31650695089397
        },
        content: 'Arts Place',
        rating: 5,
total: 1
    },
    marker3: {
        coords: {
            lat: 48.46334228767972, 
            lng: -123.31436972523507
        },
        content: 'Human&Social Development A wing',
        rating: 5,
total: 1
    },
    marker4: {
        coords: {
            lat: 48.463054775088686, 
            lng: -123.31497351986425
        },
        content: 'Human&Social Development B wing',
        rating: 5,
total: 1
    },
    marker5: {
        coords: {
            lat: 48.46243877642845, 
            lng: -123.31425168303511
        },
        content: 'MacLaurin A wing main floor',
        rating: 5,
total: 1
    },
    marker6: {
        coords: {
            lat: 48.46250835608501, 
            lng: -123.31358203991148
        },
        content: 'MacLaurin A wing outside David Lam Auditorium',
        rating: 5,
total: 1
    },
    marker7: {
        coords: {
            lat: 48.46309632863304, 
            lng: -123.31370669990311
        },
        content: 'MacLaurin D wing',
        rating: 5,
total: 1
    },
    marker8: {
        coords: {
            lat: 48.46368962735985, 
            lng: -123.31409475439476
        },
        content: 'Hickman Building',
        rating: 5,
total: 1
    },
    marker9: {
        coords: {
            lat: 48.46426565005524, 
            lng: -123.31319204984894
        },
        content: 'Cornett Building',
        rating: 5,
total: 1
    },
    marker10: {
        coords: {
            lat: 48.465058183432674, 
            lng: -123.31417037337482
        },
        content: 'David Turpin Building A wing',
        rating: 5,
total: 1
    },
    marker11: {
        coords: {
            lat: 48.46475339462066, 
            lng: -123.31317225806862
        },
        content: 'David Strong Building 1',
        rating: 5,
total: 1
    },
    marker12: {
        coords: {
            lat: 48.46502813559071, 
            lng: -123.31318496792521
        },
        content: 'David Strong Building 2',
        rating: 5,
total: 1
    },
    marker13: {
        coords: {
            lat: 48.46522365587043, 
            lng: -123.31318496792521
        },
        content: 'Business and Economics Building',
        rating: 5,
total: 1
    },
    marker14: {
        coords: {
            lat: 48.46505068129866, 
            lng: -123.31168183222047
        },
        content: 'Welcome Centre (outside of Mystic Market)',
        rating: 5,
total: 1
    },
    marker15: {
        coords: {
            lat: 48.466088792195094, 
            lng: -123.31374989758699
        },
        content: 'Michael Williams Administration Building',
        rating: 5,
total: 1
    },
    marker16: {
        coords: {
            lat: 48.46624812827346, 
            lng: -123.31248284345439
        },
        content: 'Continuing Studies',
        rating: 5,
total: 1
    },
    marker17: {
        coords: {
            lat: 48.46661991050184, 
            lng: -123.31085169330615
        },
        content: 'Mckinnon Gym',
        rating: 5,
total: 1
    },
    marker18: {
        coords: {
            lat: 48.467619363502855, 
            lng: -123.31098276786821
        },
        content: 'CARSA',
        rating: 5,
total: 1
    },
    marker19: {
        coords: {
            lat: 48.46403531188709, 
            lng: -123.31032298184077
        },
        content: 'Clearihue A wing',
        rating: 5,
total: 1
    },
    marker20: {
        coords: {
            lat: 48.46417778829146, 
            lng: -123.31090619406763
        },
        content: 'Clearihue B wing',
        rating: 5,
total: 1
    },
    marker21: {
        coords: {
            lat: 48.464546698555, 
            lng: -123.31076806485602
        },
        content: 'Clearihue C wing',
        rating: 5,
total: 1
    },
    marker22: {
        coords: {
            lat: 48.46417269985533, 
            lng: -123.30982418190985
        },
        content: 'Clearihue D wing',
        rating: 5,
total: 1
    },
    marker23: {
        coords: {
            lat: 48.46352322428724, 
            lng: -123.30985486173005
        },
        content: 'Bibliocafe',
        rating: 5,
total: 1
    },
    marker24: {
        coords: {
            lat: 48.46332034841382, 
            lng: -123.30964659639733
        },
        content: 'McPherson Library B1',
        rating: 5,
total: 1
    },
    marker25: {
        coords: {
            lat: 48.46341290575357, 
            lng: -123.30940769163811
        },
        content: 'McPherson Library Main floor',
        rating: 5,
total: 1
    },
    marker26: {
        coords: {
            lat: 48.46337191697318, 
            lng: -123.3094967038214
        },
        content: 'McPherson Library 2nd floor',
        rating: 5,
total: 1
    },
    marker27: {
        coords: {
            lat: 48.46325878777741, 
            lng: -123.30955851783747
        },
        content: 'McPherson Library 3rd floor',
        rating: 5,
total: 1
    },
    marker28: {
        coords: {
            lat: 48.46269106295666, 
            lng: -123.31002783808272
        },
        content: 'Elliott',
        rating: 5,
total: 1
    },
    marker29: {
        coords: {
            lat: 48.46185294804501, 
            lng: -123.31019047349615
        },
        content: 'Petch Building',
        rating: 5,
total: 1
    },
    marker30: {
        coords: {
            lat: 48.46203166487791, 
            lng: -123.3089312107217
        },
        content: 'BWC',
        rating: 5,
total: 1
    },  
    marker31: {
        coords: {
            lat: 48.46119487343001, 
            lng: -123.31167319933711
        },
        content: 'ECS Main floor',
        rating: 5,
total: 1
    },
    marker32: {
        coords: {
            lat: 48.46109878703432,
            lng: -123.31169353600625
        },
        content: 'ECS 2nd floor',
        rating: 5,
total: 1
    },  
    marker33: {
        coords: {
            lat: 48.46097572875317,
            lng: -123.3116299839152
        },
        content: 'ECS 3rd floor',
        rating: 5,
total: 1
    },
    marker34: {
        coords: {
            lat: 48.46118475908114,
            lng: -123.31134018638002
        },
        content: 'ECS 4th floor',
        rating: 5,
total: 1
    },
    marker35: {
        coords: {
            lat: 48.46086447032434,
            lng:  -123.31155626348958
        },
        content: 'ECS 5th floor',
        rating: 5,
total: 1
    },
    marker36: {
        coords: {
            lat: 48.46097741448506,
            lng: -123.31135289679823
        },
        content: 'ECS 6th floor',
        rating: 5,
total: 1
    },
    marker37: {
        coords: {
            lat: 48.46129997483941,
            lng: -123.31097256174465
        },
        content: 'ELW B1',
        rating: 5,
total: 1
    },
    marker38: {
        coords: {
            lat: 48.46127760903248,
            lng: -123.31033925637269
        },
        content: 'ELW Main floor',
        rating: 5,
total: 1
    },
    marker39: {
        coords: {
            lat: 48.460969908504026,
            lng: -123.31084670968853
        },
        content: 'ELW 2nd floor',
        rating: 5,
total: 1
    },
    marker40: {
        coords: {
            lat: 48.461083823385195,
            lng: -123.31097110485935
        },
        content: 'ELW 3rd floor',
        rating: 5,
total: 1
    },
    marker41: {
        coords: {
            lat: 48.461404535247375,
            lng: -123.30967501571749
        },
        content: 'EOW B1',
        rating: 5,
total: 1
    },
    marker42: {
        coords: {
            lat: 48.461392633421944,
            lng: -123.30985623188965
        },
        content: 'EOW Main floor',
        rating: 5,
total: 1
    },
    marker43: {
        coords: {
            lat: 48.464262336307414,
            lng: -123.30702507010757
        },
        content: 'The Cove Main floor',
        rating: 5,
total: 1
    },
    marker44: {
        coords: {
            lat: 48.46426515048154,
            lng: -123.30725212674602
        },
        content: 'The Cove 2nd floor',
        rating: 5,
total: 1
    },
    marker45: {
        coords: {
            lat: 48.46532281818555,
            lng: -123.30817362778484
        },
        content: 'The SUB 1',
        rating: 5,
total: 1
    },
    marker46: {
        coords: {
            lat: 48.46492565665188,
            lng: -123.30801600449101
        },
        content: 'The SUB 2',
        rating: 5,
total: 1
    },
}