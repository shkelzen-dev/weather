let currentLocation = '';
let degree = 'c';
async function fetchData(location){
  try{
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=f9388ac7e47a49f9a6682705241703&q='+location,{mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    const someData = await getWeatherData(weatherData);
    await showData(someData).then(()=>{
      document.getElementById('loading').className = 'invisible';  
    });
       
    
  }catch(error){
    console.error(error);
  }
}
async function getWeatherData (weatherData){
  const condition = weatherData.current.condition.text;
  const temp_c = weatherData.current.temp_c;
  const temp_f = weatherData.current.temp_f;
  const feelslike_c = weatherData.current.feelslike_c;
  const feelslike_f = weatherData.current.feelslike_f;
  const wind_kph = weatherData.current.wind_kph;
  const precip_mm = weatherData.current.precip_mm;
  const city = weatherData.location.name;
  const country = weatherData.location.country;
  
  return {
    condition,
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    wind_kph,
    precip_mm,
    city,
    country
  }
};
async function showData(response){
  try{
    document.getElementById('condition').value = response.condition;
    if(degree == 'f'){
      document.getElementById('temperature').value = response.temp_f;
      document.getElementById('feelslike').value = response.feelslike_f;
    }else{
    document.getElementById('temperature').value = response.temp_c;
    document.getElementById('feelslike').value = response.feelslike_c;
    }
    document.getElementById('wind').value = response.wind_kph;
    document.getElementById('precip').value = response.precip_mm;
    document.getElementById('city').value = response.city;
    document.getElementById('country').value = response.country;

    let rainUrl = 'https://media3.giphy.com/media/3ohhwutQL0CDTq3kKA/giphy.gif?cid=74c8f8aaxekj2j0ucakr752shpu6n0f2pytf3zqnuv2zxz79&ep=v1_gifs_translate&rid=giphy.gif&ct=s';
    let sunnyUrl = 'https://media2.giphy.com/media/56cvjAoSxyqyw8djin/giphy.gif?cid=74c8f8aabw3xxpcy45ck31i08jxuwottye661tmbxu0iztvy&ep=v1_gifs_translate&rid=giphy.gif&ct=s';
    let cloudyUrl = 'https://media1.giphy.com/media/l46Cq6tr96hk5NoNW/giphy.gif?cid=74c8f8aaf5qtgg24f2f69jmczwm0uadvzh9funj3pjo7zwg5&ep=v1_gifs_translate&rid=giphy.gif&ct=s';
    let rainyColor = 'rgb(84, 101, 126)';
    let sunnyColor = 'rgb(110, 197, 232)';
    let img = document.getElementById('gif');

    if(response.condition == 'Sunny' || response.condition == 'Clear'){
      img.style.backgroundImage = `url('${sunnyUrl}')`;
      img.style.backgroundSize = 'auto';
      img.style.backgroundRepeat = 'no-repeat';
      img.style.marginTop = '5vh';
      document.body.style.backgroundColor = sunnyColor;
    }else if(response.condition == 'Cloudy' || response.condition == 'Partly cloudy'){
      img.style.backgroundImage =  `url('${cloudyUrl}')`;
      img.style.backgroundSize = 'auto';
      img.style.marginTop = '25vh';
      img.style.marginLeft = '3vw'
      img.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundColor = sunnyColor;
    }else if(response.condition == 'Rain' || response.condition == 'Light rain'){
      img.style.backgroundImage = `url('${rainUrl}')`;
      img.style.backgroundSize = 'auto';
      img.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundColor = rainyColor;
      document.getElementById('gif').style.gridArea = '1/1/5/5';
      document.getElementById('gif').style.width = '100vw';
      document.getElementById('gif').style.height = '100vh';
      
    }
    return response.condition;
  }catch(error){
    throw error;
  }
};
const locationBtn = document.getElementById("locationBtn");
locationBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    document.getElementById('loading').className = 'visible';
    const location = document.getElementById('location').value ;
    currentLocation= location;
    document.getElementById('location').value = '' ;
    fetchData(currentLocation);
});

const f = document.getElementById('f');
const c = document.getElementById('c');

f.addEventListener('click',(event)=>{
  event.preventDefault();
  degree = 'f';
  document.getElementById('f').className = 'activatedButton';
  document.getElementById('c').className = 'deactivatedButton';
  fetchData(currentLocation);
});
c.addEventListener('click',(event)=>{
  event.preventDefault();
  degree = 'c';
  document.getElementById('f').className = 'deactivatedButton';
  document.getElementById('c').className = 'activatedButton';
  fetchData(currentLocation);
});

