/*global $*/
import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented,{
    jsSdkReleases:[],
    init(){
        let releases = [];
        let that = this;
        $.getJSON("https://api.github.com/repos/MyPureCloud/purecloud_api_sdk_javascript/tags").done(function(tags){
            if ( !(that.get('isDestroyed') || that.get('isDestroying')) ) {
                for(var x=0;x< tags.length; x++){
                    let tagSplit = tags[x].name.split('.');
                    if(tags[x].name.indexOf('v') === -1 && parseInt(tagSplit[0]) >= 0 &&  parseInt(tagSplit[1]) >= 50 ){
                        releases.push(tags[x].name);
                    }
                }
                releases.sort(function compare(a, b) {
                    let aSplit = a.split('.');
                    let bSplit = b.split('.');
                    if(aSplit[0].localeCompare(bSplit[0])!== 0){
                        return bSplit[0].localeCompare(aSplit[0]);
                    }
                    else if(aSplit[1].localeCompare(bSplit[1])!== 0){
                        return bSplit[1].localeCompare(aSplit[1]);
                    }else{
                        return bSplit[2].localeCompare(aSplit[2]);
                    }

                });

                that.set("jsSdkReleases", releases);
            }
        });
    }
});
