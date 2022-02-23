import {Router, Request, Response, NextFunction} from 'express';
const spawn = require('child_process').spawn;
const router: Router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {


    const ls = spawn('git',['status']);

    ls.stdout.on('data', (data:any) => {
        res.send(data)
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data:any)=> {
        res.send(data)
        console.log(`stderr: ${data}`);
    });

    ls.on('close', (code:any) => {
        console.log(`child process exited with code ${code}`);
    });



    // res.render('index', {title: 'Express'});
});

module.exports = router;
