import { Pipe, PipeTransform } from '@angular/core';

const SETTINGS = {
  "uiLanguage": "Interface Language",
  "audioLanguage": "Audio Language",
  "subtitlesLanguage": "Subtitles Language",
  "presentSubtitles": "Display Subtitles",
  "displayName": "Profile Name",
  "parentalRatingThreshold": "Parental Rating Level",
  "favoriteChannels": "Favorite Channels",
};

const SETTINGS_VALUE = {
  "eng": "English",
  "false": "False",
  "Home": "Home",
};

@Pipe({
  name: 'ctapSettings'
})
export class CtapSettingsPipe implements PipeTransform {



  transform(value: any, args?: any): any {
    if (args){
      return SETTINGS_VALUE[value]?SETTINGS_VALUE[value]:value;
    }else{
      return SETTINGS[value]?SETTINGS[value]:value;
    }

  }

}

