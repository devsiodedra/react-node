var path = require('path');
var moment = require('moment');
module.exports = {

    'create' : async function (req, res) {
        var post = req.body;
        var required_element = ['name','description','price'];
        var required = required_element.every(function(item){
            return post.hasOwnProperty(item);
        });
        if(!required) {
            return res.missingParam();
        }

        var cakeData = {};
        cakeData.name = post.name;
        cakeData.description = post.description;
        cakeData.price = post.price;
        cakeData.status = 1;
        cakeData.created_date = moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');

        if (req._fileparser.upstreams.length) {
            req.file('file').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/dist/img/'),
            }, async function(err, uploadedFiles) {
                if (err) return res.serverError(err);
                cakeData.file = path.basename(uploadedFiles[0].fd);
                var cake = await Cake.create(cakeData).fetch();
                if(cake){
                    return res.json({status: true , message: req.i18n.__('Created sucessfully.'), cake: cake });
                } else {
                    return res.json({status: false , message: req.i18n.__('Cannot create at the moment.') });
                }
            });
        } else {
            return res.json({status: false , message: req.i18n.__('Please upload image.') });
        }
        
    },
    'update' : async function (req, res) {
        var post = req.body;
        var required_element = ['id','name','description','price'];
        var required = required_element.every(function(item){
            return post.hasOwnProperty(item);
        });
        if(!required) {
            return res.missingParam();
        }

        var cakeData = {};
        
        if (req._fileparser.upstreams.length) {
            cakeData.name = post.name;
            cakeData.description = post.description;
            cakeData.price = post.price;

            req.file('file').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/dist/img/'),
            }, async function(err, uploadedFiles) {
                if (err) return res.serverError(err);
                var file = path.basename(uploadedFiles[0].fd);
                var cake = await Cake.updateOne({ id:post.id })
                .set({
                    name: post.name, description: post.description, price: post.price, file:file
                });
                if(cake){
                    return res.json({status: true , message: req.i18n.__('Updated sucessfully.'), cake: cake });
                } else {
                    return res.json({status: false , message: req.i18n.__('Cannot update at the moment.') });
                }
            });
        } else {
            cakeData.name = post.name;
            cakeData.description = post.description;
            cakeData.price = post.price;

            var cake = await Cake.updateOne({ id:post.id })
            .set({
                name: post.name, description: post.description, price: post.price
            });
            if(cake){
                return res.json({status: true , message: req.i18n.__('Updated sucessfully.'), cake: cake });
            } else {
                return res.json({status: false , message: req.i18n.__('Cannot update at the moment.') });
            }
        }
        
    },
    'delete' : async function (req, res) {
        var post = req.body;
        var required_element = ['id'];
        var required = required_element.every(function(item){
            return post.hasOwnProperty(item);
        });
        if(!required) {
            return res.missingParam();
        }

        var deleteCake = await Cake.destroy({id:post.id}).fetch();
        if(deleteCake){
            return res.json({status: true , message: req.i18n.__('Deleted sucessfully.') });
        } else {
            return res.json({status: false , message: req.i18n.__('Cannot delete at the moment.') });
        }

    },
    'list' : async function (req, res) {

        var cake = await Cake.find();
        if(cake){
            for(var k in cake){
                cake[k].file_url = sails.config.custom.baseUrl + '/dist/img/' + cake[k].file;
            }
            return res.json({status: true , message: req.i18n.__('Listed sucessfully.'), cake:cake });
        } else {
            return res.json({status: false , message: req.i18n.__('No data found.'), cake:cake });
        }

    },
    'listOne' : async function (req, res) {

        var cake = await Cake.findOne({id:req.param('id')});
        if(cake){
            cake.file_url = sails.config.custom.baseUrl + '/dist/img/' + cake.file;
            return res.json({status: true , message: req.i18n.__('Listed sucessfully.'), cake:cake });
        } else {
            return res.json({status: false , message: req.i18n.__('No data found.'), cake:cake });
        }

    }
}