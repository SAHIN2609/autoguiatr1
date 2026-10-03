
(async()=>{try{
// id, label, min, max, default, unit, step
const D=[
['ingain','Input',-12,12,0,' dB',.1],['gate','Threshold',-80,-20,-55,' dB',1],['transpose','Transpose',-12,12,0,' st',1],['out','Output',-24,12,-6,' dB',.1],
['gain','Gain',0,10,6,'',.1],['tight','Tight',0,10,5,'',.1],['bass','Bass',0,10,5,'',.1],['mid','Mid',0,10,6,'',.1],['treble','Treble',0,10,5,'',.1],['pres','Presence',0,10,5,'',.1],['depth','Depth',0,10,4,'',.1],['master','Master',0,10,6,'',.1],
['d_drive','Drive',0,10,4,'',.1],['d_tone','Tone',0,10,5,'',.1],['d_level','Level',0,10,6,'',.1],['d_tight','Tight',0,10,6,'',.1],
['b_gain','Boost',0,10,5,'',.1],['b_tone','Tone',0,10,5,'',.1],['b_level','Level',0,10,5,'',.1],
['c_sus','Sustain',0,10,5,'',.1],['c_att','Attack',0,10,5,'',.1],['c_level','Level',0,10,5,'',.1],
['t_pitch','Pitch',-12,12,-2,' st',1],['t_blend','Blend',0,10,10,'',.1],
['s_buzz','Buzz',0,10,6,'',.1],['s_res','Sympathy',0,10,5,'',.1],['s_tone','Tone',0,10,6,'',.1],['s_mix','Mix',0,10,7,'',.1],
['synon','On',0,1,0,'',1],['synmix','Mix',0,1,.75,'',.01],['synwave','Wave',0,4,1,'',1],['synsub','Sub',0,1,.35,'',.01],['syncut','Cutoff',80,12000,4200,' Hz',10],['synres','Resonance',0,1,.18,'',.01],
['synatt','Attack',.5,250,8,' ms',.5],['syndec','Decay',5,1000,120,' ms',1],['synsus','Sustain',0,1,.72,'',.01],['synrel','Release',10,1200,180,' ms',1],['synoct','Octave',-2,2,0,'',1],['syntrk','Tracking',0,1,.65,'',.01],['synstab','Stability',0,1,.65,'',.01],['syndrive','Drive',0,10,2,'',.1],['synspread','Spread',0,1,.22,'',.01],['synmod','Mod',0,1,.35,'',.01],
['synvoice','Voice',0,7,2,'',1],['synosc2','Osc 2',0,1,.65,'',.01],['syndetune','Detune',-24,24,7,' cents',.1],['synpw','Pulse',.05,.95,.50,'',.01],['synfilter','Filter',0,2,0,'',1],['synenvamt','Env Amt',-1,1,.55,'',.01],['synlforate','LFO Rate',.1,12,5,' Hz',.1],['synlfodepth','LFO Depth',0,1,.18,'',.01],['synglide','Glide',0,250,25,' ms',1],['synnoise','Noise',0,1,.03,'',.01],
['aton','On',0,1,0,'',1],['atkey','Key',0,11,0,'',1],['atscale','Scale',0,5,0,'',1],['atspeed','Speed',0,100,72,'',1],['atamount','Amount',0,100,92,' %',1],['athuman','Humanize',0,100,18,' %',1],['atmix','Mix',0,100,100,' %',1],['attrack','Tracking',0,1,.78,'',.01],
['cabmix','IR mix',0,100,100,' %',1],['dist','Distance',0,10,3,'',.1],['pos','Position',0,10,4,'',.1],['angle','Angle',0,10,2,'',.1],['room','Room',0,10,1,'',.1],
['e1','Low',-15,15,0,' dB',.1],['e2','Low mid',-15,15,0,' dB',.1],['e3','Mid',-15,15,0,' dB',.1],['e4','High mid',-15,15,0,' dB',.1],['e5','High',-15,15,0,' dB',.1],
['f1','Freq',30,300,80,' Hz',1],['f2','Freq',120,800,300,' Hz',1],['f3','Freq',400,3000,1000,' Hz',1],['f4','Freq',1500,8000,3000,' Hz',10],['f5','Freq',3000,16000,8000,' Hz',10],
['hpf','HPF',20,300,40,' Hz',1],['lpf','LPF',3000,16000,12000,' Hz',10],
['mode','Mode',0,4,2,'',1],['cab','Cab',0,5,2,'',1],['mic','Mic',0,2,0,'',1],
['gateon','Gate',0,1,1,'',1],['drvon','On',0,1,1,'',1],['bston','On',0,1,0,'',1],['cmpon','On',0,1,0,'',1],['tunon','On',0,1,0,'',1],['stron','On',0,1,0,'',1]];
// 158 curated factory presets. Only six dedicated synth presets; ten scale-aware AutoTune presets.
// not copies of any commercial preset bank. Each category gets 11 production-ready variants.
const CATS={};
// Curated factory bank: 142 amp/rack presets + only 6 synth presets.
// The recipes are intentionally hand-shaped around gain staging, EQ balance, cabinet choice and playing use.
const base={ingain:0,gate:-55,transpose:0,out:-6,gain:5,tight:5,bass:5,mid:5,treble:5,pres:5,depth:4,master:6,
 d_drive:3.2,d_tone:5.2,d_level:5.6,d_tight:6,b_gain:4.5,b_tone:5.5,b_level:5.5,c_sus:5,c_att:5,c_level:5,t_pitch:-2,t_blend:10,
 s_buzz:6,s_res:5,s_tone:6,s_mix:7,aton:0,atkey:0,atscale:0,atspeed:72,atamount:92,athuman:18,atmix:100,attrack:.78,cabmix:100,dist:3,pos:4,angle:2,room:1,e1:0,e2:0,e3:0,e4:0,e5:0,f1:80,f2:300,f3:1000,f4:3000,f5:8000,hpf:40,lpf:12000,
 mode:2,cab:2,mic:0,gateon:1,drvon:0,bston:0,cmpon:0,tunon:0,stron:0,synon:0,synmix:.75,synwave:0,synsub:.35,syncut:4200,synres:.18,synatt:8,syndec:120,synsus:.72,synrel:180,synoct:0,syntrk:.7,synstab:.75,syndrive:2,synspread:.22,synmod:.35,synvoice:2,synosc2:.65,syndetune:7,synpw:.5,synfilter:0,synenvamt:.55,synlforate:5,synlfodepth:.18,synglide:25,synnoise:.03};
const P=(name,v)=>[name,{...base,...v}];
function add(cat,list){const existing=CATS[cat]||{};CATS[cat]=Object.assign({},existing,Object.fromEntries(list.map(x=>P(x[0],x[1]))))}
add('CLEAN',[
['Silver Room',{mode:0,gain:3.0,tight:2.4,bass:5.3,mid:5.0,treble:6.0,pres:5.1,depth:4.2,cab:1,mic:1,room:1.2,e2:.5,e4:1.0}],
['Twin Afterdark',{mode:0,gain:3.5,tight:2.7,bass:5.7,mid:5.8,treble:5.4,pres:4.7,depth:4.8,cab:3,mic:2,room:1.6,e1:.8,e5:-.6}],
['Glass Horizon',{mode:0,gain:2.8,tight:2.2,bass:5.4,mid:4.8,treble:5.8,pres:4.8,depth:3.8,master:6.2,cab:0,mic:1,drvon:0,room:1.5,e3:1.2,e4:.6,lpf:13500}],
['Velvet Studio',{mode:0,gain:2.2,tight:1.8,bass:5.8,mid:5.3,treble:4.8,pres:4.2,depth:4.3,master:6.4,cab:1,mic:2,e1:.7,e2:.5,e5:-.7,lpf:11500}],
['Black Glass',{mode:0,gain:3.4,tight:2.8,bass:4.8,mid:5.8,treble:6.2,pres:5.6,depth:3.4,cab:4,mic:0,drvon:1,d_drive:1.6,d_tone:5.5,d_level:4.8}],
['Wide Chorus Base',{mode:0,gain:2.5,tight:2,bass:5.5,mid:4.6,treble:6.1,pres:5.5,depth:5,cab:1,mic:1,room:2.5,e4:1.1,e5:1.3}],
['Pickup Bloom',{mode:0,gain:3.8,tight:2.6,bass:5.1,mid:5.4,treble:5.5,pres:4.8,depth:4,cab:0,mic:0,drvon:1,d_drive:2.4,d_tone:5.8,d_level:4.6}],
['Neckwood',{mode:0,gain:2.7,tight:1.5,bass:6.1,mid:5.7,treble:4.3,pres:3.8,depth:5.2,cab:1,mic:2,e1:1.2,e2:.8,e5:-1.2}],
['Edge Of Clean',{mode:1,gain:3.7,tight:3.4,bass:5.2,mid:5.2,treble:5.7,pres:5.2,depth:4.2,cab:0,mic:0,drvon:1,d_drive:1.8,d_tone:6,d_level:5.1}],
['Shimmer Lead Clean',{mode:0,gain:3.1,tight:2.5,bass:4.9,mid:6.1,treble:6.3,pres:6.1,depth:3.2,cab:4,mic:1,e4:1.8,e5:1.2,lpf:14500}],
['Low String Clean',{mode:0,gain:2.4,tight:3.2,bass:6.4,mid:4.9,treble:4.7,pres:4.1,depth:5.8,cab:5,mic:2,e1:1.4,e3:-.6}],
['Midnight Clean',{mode:0,gain:2.9,tight:2.7,bass:5.6,mid:5.9,treble:5.2,pres:4.6,depth:4.7,cab:3,mic:2,room:1.8,e2:.7,e3:.8}]
]);
add('CRUNCH & ROCK',[
['Copper Riot',{mode:1,gain:5.6,tight:4.0,bass:5.4,mid:6.5,treble:6.0,pres:5.6,depth:4.0,cab:2,mic:0,drvon:1,d_drive:3.1,d_tone:6.0,d_level:5.3}],
['Old Stage',{mode:1,gain:4.9,tight:3.0,bass:6.0,mid:6.1,treble:5.4,pres:4.9,depth:5.0,cab:0,mic:2,drvon:1,d_drive:2.5,d_tone:5.2,d_level:5.1,room:1.5}],
['Brown Voltage',{mode:1,gain:4.7,tight:3.5,bass:5.6,mid:6.2,treble:5.8,pres:5.3,depth:4.4,cab:0,mic:0,drvon:1,d_drive:2.6,d_tone:5.7,d_level:5.2}],
['Hot Plex Edge',{mode:1,gain:5.2,tight:4.1,bass:5.0,mid:6.6,treble:6.1,pres:5.7,depth:4.0,cab:1,mic:0,drvon:1,d_drive:3.0,d_tone:6.2,d_level:5.3}],
['Stone Rhythm',{mode:1,gain:5.5,tight:4.8,bass:5.4,mid:5.6,treble:5.3,pres:5.0,depth:4.8,cab:2,mic:0,drvon:1,d_drive:3.4,d_tone:5.4,d_level:5.6}],
['Classic Bite',{mode:1,gain:4.3,tight:3.2,bass:5.1,mid:6.8,treble:6.5,pres:6.0,depth:3.7,cab:4,mic:1,drvon:1,d_drive:2.1,d_tone:6.8,d_level:5}],
['Pushed Green',{mode:1,gain:4.0,tight:5.2,bass:4.4,mid:6.0,treble:5.8,pres:5.5,depth:3.8,cab:2,mic:0,drvon:1,d_drive:4,d_tone:5.5,d_level:5.8}],
['Open Rock',{mode:1,gain:5.0,tight:2.8,bass:6.1,mid:5.7,treble:5.5,pres:4.6,depth:5.4,cab:1,mic:2,room:1.4}],
['Riff Lantern',{mode:1,gain:5.8,tight:5.8,bass:4.8,mid:6.3,treble:5.9,pres:5.8,depth:4.2,cab:2,mic:0,drvon:1,d_drive:3.8,d_tone:5.8,d_level:5.8}],
['Burning Chime',{mode:1,gain:6.0,tight:4.2,bass:4.5,mid:6.8,treble:6.4,pres:6.2,depth:3.8,cab:4,mic:1,drvon:1,d_drive:3.2,d_tone:6.5,d_level:5.5}],
['Raw Room',{mode:1,gain:4.8,tight:3.6,bass:5.8,mid:5.2,treble:5.1,pres:4.5,depth:5.5,cab:5,mic:2,room:3.2}],
['Arena Crunch',{mode:1,gain:6.3,tight:4.6,bass:5.2,mid:6.0,treble:6.1,pres:6.0,depth:4.0,cab:2,mic:0,bston:1,b_gain:3.5,b_tone:6.2,b_level:5.8}]
]);
add('MODERN METAL',[
['Obsidian Core',{mode:2,gain:7.3,tight:7.6,bass:4.0,mid:5.6,treble:5.7,pres:6.2,depth:3.7,cab:2,mic:0,drvon:1,d_drive:4.4,d_tight:8.0,d_tone:5.5,d_level:5.8}],
['Silver Fang',{mode:2,gain:6.7,tight:8.0,bass:3.6,mid:6.3,treble:6.0,pres:6.6,depth:3.0,cab:4,mic:1,drvon:1,d_drive:4.1,d_tight:8.5,d_tone:6.1,d_level:5.8}],
['Razor Crown',{mode:2,gain:6.8,tight:7.2,bass:4.0,mid:5.7,treble:5.8,pres:6.1,depth:3.8,master:6.3,cab:2,mic:0,drvon:1,d_drive:4.2,d_tight:7.4,d_tone:5.4,d_level:5.8,hpf:55,lpf:9500}],
['Blackout 515',{mode:2,gain:7.2,tight:6.6,bass:4.5,mid:5.1,treble:6.2,pres:6.4,depth:3.5,cab:2,mic:0,drvon:1,d_drive:3.8,d_tight:7.0,d_tone:6.0,d_level:5.7}],
['Tight Horizon',{mode:2,gain:6.4,tight:8.1,bass:3.7,mid:6.2,treble:5.5,pres:6.2,depth:3.2,cab:4,mic:0,drvon:1,d_drive:4.6,d_tight:8.5,d_tone:5.1,d_level:5.9}],
['Iron Room',{mode:2,gain:7.6,tight:6.0,bass:4.7,mid:5.8,treble:5.4,pres:5.7,depth:4.8,cab:3,mic:2,drvon:1,d_drive:4.0,d_tight:6.5,d_tone:4.8,d_level:5.8}],
['Violet Wall',{mode:2,gain:7.0,tight:7.0,bass:4.2,mid:6.7,treble:5.8,pres:6.4,depth:3.5,cab:2,mic:1,drvon:1,d_drive:4.4,d_tight:7.8,d_tone:5.8,d_level:5.7}],
['Midnight Viper',{mode:2,gain:7.8,tight:7.5,bass:3.5,mid:5.0,treble:6.0,pres:6.7,depth:3.0,cab:4,mic:0,drvon:1,d_drive:4.8,d_tight:8,d_tone:6.1,d_level:6}],
['Low Orbit',{mode:2,gain:6.6,tight:6.4,bass:5.2,mid:5.6,treble:5.0,pres:5.4,depth:5.4,cab:3,mic:2,drvon:1,d_drive:3.5,d_tight:6.2,d_tone:4.7,d_level:5.6}],
['Chrome Bite',{mode:2,gain:6.2,tight:7.8,bass:3.9,mid:6.0,treble:6.4,pres:6.6,depth:2.8,cab:4,mic:1,drvon:1,d_drive:4.0,d_tight:8.2,d_tone:6.5,d_level:5.7}],
['Heavy Glass',{mode:2,gain:6.9,tight:6.8,bass:4.3,mid:6.4,treble:5.3,pres:5.8,depth:4.0,cab:2,mic:2,drvon:1,d_drive:4.2,d_tight:7.3,d_tone:5.0,d_level:5.8}],
['Machine Heart',{mode:2,gain:8.0,tight:7.2,bass:3.8,mid:5.4,treble:6.1,pres:6.3,depth:3.6,cab:2,mic:0,bston:1,b_gain:4.0,b_tone:6.0,b_level:5.8,d_drive:4.7,d_tight:8.0}]
]);
add('DJENT & RHYTHM',[
['Surgical Pick',{mode:2,gain:6.6,tight:8.8,bass:3.1,mid:6.1,treble:5.3,pres:6.5,depth:2.6,cab:2,mic:0,drvon:1,d_drive:5.2,d_tight:9,d_tone:5.1,d_level:5.8,hpf:65,lpf:9000}],
['Glass Chug',{mode:2,gain:6.3,tight:9.2,bass:3.0,mid:6.7,treble:5.0,pres:6.8,depth:2.3,cab:4,mic:0,drvon:1,d_drive:5.0,d_tight:9.3,d_tone:5.0,d_level:5.8}],
['Polished Chug',{mode:2,gain:7.0,tight:8.4,bass:3.4,mid:5.9,treble:5.8,pres:6.1,depth:2.9,cab:2,mic:1,drvon:1,d_drive:5.5,d_tight:8.8,d_tone:5.6,d_level:5.9}],
['Dry Machine',{mode:2,gain:6.8,tight:9.5,bass:2.8,mid:6.4,treble:4.7,pres:5.8,depth:2.0,cab:5,mic:2,drvon:1,d_drive:5.6,d_tight:9.5,d_tone:4.6,d_level:5.8}],
['Wide Djent',{mode:2,gain:7.2,tight:8.0,bass:3.7,mid:5.6,treble:6.1,pres:6.7,depth:3.1,cab:2,mic:1,drvon:1,d_drive:4.7,d_tight:8.5,d_tone:6.1,d_level:5.9}],
['Concrete Palm',{mode:2,gain:7.5,tight:9.0,bass:3.2,mid:5.2,treble:5.5,pres:6.0,depth:2.7,cab:3,mic:0,drvon:1,d_drive:5.2,d_tight:9.1,d_tone:5.3,d_level:5.8}],
['Cut Glass Rhythm',{mode:2,gain:6.0,tight:8.7,bass:3.0,mid:7.0,treble:5.7,pres:6.8,depth:2.4,cab:4,mic:0,drvon:1,d_drive:4.5,d_tight:9,d_tone:5.9,d_level:5.7}],
['Sub Punch',{mode:2,gain:7.1,tight:7.8,bass:4.4,mid:5.4,treble:4.8,pres:5.4,depth:4.4,cab:3,mic:2,drvon:1,d_drive:4.6,d_tight:8.2,d_tone:4.6,d_level:5.8}],
['Perimeter',{mode:2,gain:7.7,tight:8.6,bass:3.6,mid:6.0,treble:5.6,pres:6.5,depth:3.0,cab:2,mic:0,drvon:1,d_drive:5.4,d_tight:8.9,d_tone:5.4,d_level:5.9}],
['Zero Bloom',{mode:2,gain:6.4,tight:9.6,bass:2.6,mid:6.6,treble:4.9,pres:5.9,depth:1.8,cab:5,mic:0,drvon:1,d_drive:5.8,d_tight:9.6,d_tone:4.8,d_level:5.7}]
]);
add('DEATH & EXTREME',[
['Grave Engine',{mode:2,gain:8.0,tight:6.9,bass:4.6,mid:4.4,treble:5.4,pres:5.2,depth:4.9,cab:3,mic:2,drvon:1,d_drive:5.2,d_tight:7.1,d_tone:4.5,d_level:5.8}],
['Black Tongue',{mode:2,gain:8.4,tight:6.1,bass:5.1,mid:4.0,treble:5.1,pres:4.8,depth:5.5,cab:3,mic:2,drvon:1,d_drive:5.5,d_tight:6.7,d_tone:4.2,d_level:5.9}],
['Rotten Sun',{mode:2,gain:7.8,tight:7.2,bass:4.3,mid:4.8,treble:5.8,pres:5.6,depth:4.4,cab:2,mic:0,drvon:1,d_drive:5.0,d_tight:7.6,d_tone:5.0,d_level:5.8}],
['Buried Mids',{mode:2,gain:8.2,tight:6.4,bass:4.8,mid:3.8,treble:5.6,pres:5.1,depth:5.1,cab:3,mic:2,drvon:1,d_drive:5.8,d_tight:7,d_tone:4.7,d_level:5.9}],
['Feral Chain',{mode:3,gain:7.4,tight:5.8,bass:4.2,mid:5.0,treble:6.0,pres:6.2,depth:4.0,cab:2,mic:0,drvon:1,d_drive:4.8,d_tight:6.2,d_tone:6.0,d_level:5.7}],
['Abyss Rhythm',{mode:2,gain:8.6,tight:6.8,bass:5.3,mid:4.2,treble:4.9,pres:4.7,depth:5.8,cab:3,mic:2,drvon:1,d_drive:6,d_tight:7.2,d_tone:4.0,d_level:5.9}],
['Ashes Down',{mode:2,gain:7.9,tight:7.4,bass:4.0,mid:4.9,treble:5.7,pres:5.7,depth:4.0,cab:2,mic:0,drvon:1,d_drive:5.4,d_tight:7.8,d_tone:5.2,d_level:5.8}],
['Cold Kill',{mode:2,gain:8.3,tight:8.0,bass:3.6,mid:4.5,treble:5.9,pres:6.0,depth:3.5,cab:4,mic:0,drvon:1,d_drive:5.6,d_tight:8.3,d_tone:5.7,d_level:5.8}],
['Mud Crown',{mode:2,gain:8.7,tight:5.8,bass:6.0,mid:3.9,treble:4.4,pres:4.2,depth:6.2,cab:3,mic:2,drvon:1,d_drive:5.0,d_tight:6.4,d_tone:3.9,d_level:5.9}],
['Endless Grave',{mode:3,gain:8.0,tight:6.5,bass:4.0,mid:5.6,treble:6.2,pres:6.3,depth:3.8,cab:2,mic:1,drvon:1,d_drive:5.0,d_tight:7,d_tone:6.2,d_level:5.8}]
]);
add('PROGRESSIVE',[
['Signal Garden',{mode:1,gain:4.8,tight:4.2,bass:4.8,mid:6.9,treble:6.1,pres:6.0,depth:3.6,cab:1,mic:1,drvon:1,d_drive:2.5,d_tone:6.2,d_level:5.0}],
['Vector Bloom',{mode:2,gain:5.7,tight:6.1,bass:4.1,mid:6.5,treble:5.7,pres:6.2,depth:3.2,cab:2,mic:1,drvon:1,d_drive:3.1,d_tone:6.0,d_level:5.4}],
['Polyrhythm Glass',{mode:2,gain:5.8,tight:6.0,bass:4.4,mid:6.7,treble:5.6,pres:6.0,depth:3.2,cab:4,mic:1,drvon:1,d_drive:3.2,d_tone:6,d_level:5.4}],
['Luminous Prog',{mode:1,gain:5.4,tight:4.5,bass:4.9,mid:6.8,treble:6.0,pres:6.2,depth:3.7,cab:1,mic:1,drvon:1,d_drive:2.8,d_tone:6.3,d_level:5.2}],
['Odd Meter',{mode:2,gain:6.4,tight:7.0,bass:3.8,mid:6.2,treble:5.4,pres:6.1,depth:3.1,cab:2,mic:0,drvon:1,d_drive:3.8,d_tone:5.5,d_level:5.6}],
['Glass Cathedral',{mode:0,gain:3.8,tight:2.8,bass:4.7,mid:6.4,treble:6.5,pres:6.5,depth:3.0,cab:4,mic:1,drvon:1,d_drive:2.1,d_tone:6.4,d_level:4.8,room:2.5}],
['Prog Low Gain',{mode:1,gain:4.6,tight:4.0,bass:5.2,mid:6.1,treble:5.6,pres:5.4,depth:4.0,cab:1,mic:0,drvon:1,d_drive:2.3,d_tone:5.8,d_level:5.1}],
['Modern Fusion',{mode:2,gain:5.2,tight:5.7,bass:4.2,mid:7.0,treble:5.8,pres:6.0,depth:3.0,cab:2,mic:1,drvon:1,d_drive:2.7,d_tone:6.1,d_level:5.3}],
['Clean Machine',{mode:0,gain:3.2,tight:2.4,bass:5.0,mid:6.0,treble:6.1,pres:5.8,depth:3.5,cab:0,mic:1,drvon:1,d_drive:1.7,d_tone:6.0,d_level:4.6}],
['Fusion Edge',{mode:1,gain:5.1,tight:4.4,bass:4.7,mid:6.6,treble:6.2,pres:6.0,depth:3.3,cab:4,mic:1,drvon:1,d_drive:2.6,d_tone:6.4,d_level:5.1}],
['Glass Chasm',{mode:2,gain:6.0,tight:6.5,bass:4.0,mid:6.4,treble:5.8,pres:6.4,depth:2.8,cab:4,mic:1,drvon:1,d_drive:3.0,d_tone:6.2,d_level:5.4}],
['Clockwork Lead',{mode:3,gain:6.8,tight:5.4,bass:4.0,mid:7.0,treble:5.6,pres:6.0,depth:3.4,cab:2,mic:1,drvon:1,d_drive:3.5,d_tone:6.0,d_level:5.5,bston:1,b_gain:3.0,b_tone:6,b_level:5.5}]
]);
add('LEAD',[
['Mercury Voice',{mode:3,gain:7.3,tight:4.7,bass:4.2,mid:7.6,treble:5.8,pres:6.2,depth:3.5,cab:2,mic:1,drvon:1,d_drive:3.6,d_tone:6.2,d_level:5.4}],
['Glassfire Solo',{mode:3,gain:6.8,tight:5.0,bass:4.0,mid:7.3,treble:6.4,pres:6.7,depth:3.0,cab:4,mic:1,drvon:1,d_drive:3.5,d_tone:6.8,d_level:5.3}],
['Liquid Violet',{mode:3,gain:7.0,tight:4.8,bass:4.0,mid:7.4,treble:5.4,pres:6.1,depth:3.5,cab:2,mic:1,drvon:1,d_drive:3.4,d_tone:6.2,d_level:5.4,bston:1,b_gain:3,b_tone:6.4,b_level:5.6}],
['Singing Lead',{mode:3,gain:7.4,tight:4.4,bass:4.3,mid:7.8,treble:5.1,pres:5.8,depth:3.8,cab:3,mic:1,drvon:1,d_drive:3.2,d_tone:5.8,d_level:5.4}],
['Highway Solo',{mode:3,gain:6.7,tight:4.2,bass:4.7,mid:7.0,treble:6.0,pres:6.3,depth:4.0,cab:1,mic:1,drvon:1,d_drive:2.8,d_tone:6.6,d_level:5.2}],
['Laser Legato',{mode:3,gain:7.8,tight:5.2,bass:3.7,mid:7.2,treble:5.8,pres:6.6,depth:3.0,cab:4,mic:1,drvon:1,d_drive:3.8,d_tone:6.3,d_level:5.5}],
['Dark Lead',{mode:3,gain:7.6,tight:4.8,bass:5.0,mid:6.6,treble:4.8,pres:5.0,depth:4.7,cab:3,mic:2,drvon:1,d_drive:3.5,d_tone:4.6,d_level:5.5}],
['Sustain Arc',{mode:3,gain:8.0,tight:4.0,bass:4.1,mid:7.7,treble:5.5,pres:6.2,depth:3.2,cab:2,mic:0,drvon:1,d_drive:3.8,d_tone:6.1,d_level:5.5,bston:1,b_gain:3.2,b_tone:6.1,b_level:5.5}],
['Neo Solo',{mode:3,gain:7.1,tight:5.5,bass:3.8,mid:7.0,treble:6.2,pres:6.8,depth:2.9,cab:4,mic:1,drvon:1,d_drive:3.9,d_tone:6.8,d_level:5.4}],
['Vocal String',{mode:3,gain:6.6,tight:4.6,bass:4.4,mid:7.9,treble:5.2,pres:5.9,depth:3.9,cab:1,mic:1,drvon:1,d_drive:2.8,d_tone:5.8,d_level:5.2}],
['Afterglow Lead',{mode:3,gain:6.2,tight:4.0,bass:4.8,mid:7.1,treble:5.9,pres:6.1,depth:4.4,cab:0,mic:1,drvon:1,d_drive:2.6,d_tone:6.0,d_level:5.1,room:2.2}],
['Final Horizon',{mode:3,gain:7.7,tight:5.0,bass:4.0,mid:7.5,treble:6.0,pres:6.4,depth:3.1,cab:2,mic:0,drvon:1,d_drive:4.0,d_tone:6.2,d_level:5.6,bston:1,b_gain:3.5,b_tone:6.3,b_level:5.7}]
]);
add('AMBIENT & TEXTURE',[
['Moonwire',{mode:0,gain:3.0,tight:2.1,bass:5.4,mid:5.7,treble:6.7,pres:6.4,depth:4.5,cab:0,mic:1,room:6.4,e4:1.4,e5:1.8,lpf:15000}],
['Black Aurora',{mode:2,gain:5.0,tight:4.8,bass:5.2,mid:4.9,treble:4.6,pres:4.4,depth:5.5,cab:3,mic:2,room:6.0,lpf:8200}],
['Nebula Clean',{mode:0,gain:3.2,tight:2.2,bass:5.1,mid:5.5,treble:6.4,pres:6.1,depth:4.8,cab:0,mic:1,room:5.5,e4:1.2,e5:1.6,lpf:15000}],
['Purple Air',{mode:0,gain:3.6,tight:2.6,bass:4.8,mid:5.8,treble:6.6,pres:6.3,depth:4.0,cab:4,mic:1,room:6,e3:.7,e4:1.5,e5:1.8}],
['Slow Bloom',{mode:1,gain:4.0,tight:3.0,bass:5.5,mid:5.8,treble:5.8,pres:5.2,depth:5.0,cab:1,mic:2,room:5.2,drvon:1,d_drive:1.8,d_tone:5.4,d_level:4.7}],
['Dark Nebula',{mode:2,gain:5.5,tight:5.0,bass:5.0,mid:4.7,treble:4.8,pres:4.6,depth:5.8,cab:3,mic:2,room:5.5,lpf:8500}],
['Starlight Edge',{mode:1,gain:4.5,tight:3.4,bass:4.7,mid:6.0,treble:6.5,pres:6.2,depth:4.1,cab:4,mic:1,room:4.8,drvon:1,d_drive:2.4,d_tone:6.4,d_level:4.8}],
['Frozen Glass',{mode:0,gain:2.8,tight:2.0,bass:4.5,mid:5.9,treble:6.9,pres:6.8,depth:3.7,cab:4,mic:1,room:6.2,e4:1.8,e5:2.0}],
['Cathedral Lead',{mode:3,gain:6.2,tight:4.0,bass:4.1,mid:6.8,treble:5.6,pres:6.0,depth:3.5,cab:2,mic:1,room:5.6,drvon:1,d_drive:2.8,d_tone:6.1,d_level:5.0}],
['Nocturne',{mode:1,gain:4.1,tight:2.8,bass:5.8,mid:5.2,treble:4.8,pres:4.5,depth:5.1,cab:3,mic:2,room:5.8}]
]);
add('SITAR & WORLD',[
['Raga Spark',{mode:4,gain:4.7,tight:3.6,bass:5.0,mid:6.3,treble:6.6,pres:6.8,depth:4.5,cab:4,mic:1,stron:1,s_buzz:6.5,s_res:6.2,s_tone:6.8,s_mix:7.5,room:1.5}],
['Raga Glass',{mode:4,gain:4.2,tight:3.0,bass:5.4,mid:6.0,treble:7.0,pres:7.0,depth:4.0,cab:0,mic:1,stron:1,s_buzz:5.0,s_res:7.0,s_tone:7.5,s_mix:7.8}],
['Dark Sitar',{mode:4,gain:5.2,tight:4.0,bass:5.8,mid:5.5,treble:5.0,pres:4.7,depth:5.4,cab:3,mic:2,stron:1,s_buzz:6.8,s_res:6.5,s_tone:4.7,s_mix:7.2}],
['Electric Raga',{mode:4,gain:5.5,tight:4.6,bass:4.8,mid:6.8,treble:6.1,pres:6.2,depth:3.8,cab:2,mic:0,stron:1,s_buzz:7.5,s_res:5.8,s_tone:6.4,s_mix:6.8,drvon:1,d_drive:2.5,d_tone:6.0,d_level:5.0}],
['Jali Resonance',{mode:4,gain:4.6,tight:3.5,bass:5.2,mid:6.6,treble:6.5,pres:6.5,depth:4.4,cab:1,mic:1,stron:1,s_buzz:5.8,s_res:7.5,s_tone:6.6,s_mix:8}],
['Temple Wire',{mode:4,gain:3.8,tight:2.8,bass:5.7,mid:6.0,treble:6.8,pres:6.9,depth:4.9,cab:0,mic:1,stron:1,s_buzz:4.8,s_res:8,s_tone:7.2,s_mix:8,room:2.0}]
]);
add('SPECIAL',[
['Octave Forge',{mode:2,gain:6.5,tight:7.0,bass:4.0,mid:5.8,treble:5.5,pres:6.0,depth:3.3,cab:2,mic:0,tunon:1,t_pitch:-12,t_blend:4,drvon:1,d_drive:4.5,d_tight:7.5,d_tone:5.5,d_level:5.6}],
['Drop Hammer',{mode:2,gain:7.4,tight:7.8,bass:3.8,mid:5.2,treble:5.4,pres:5.8,depth:3.1,cab:3,mic:0,tunon:1,t_pitch:-2,t_blend:10,drvon:1,d_drive:4.5,d_tight:8,d_tone:5,d_level:5.8}],
['Boosted Clean',{mode:0,gain:3.6,tight:3.0,bass:4.8,mid:6.2,treble:6.0,pres:5.8,depth:3.7,cab:1,mic:0,bston:1,b_gain:5,b_tone:6.2,b_level:5.5}],
['Comp Snap',{mode:1,gain:4.0,tight:3.5,bass:5.0,mid:5.8,treble:6.2,pres:6.0,depth:3.8,cab:0,mic:1,cmpon:1,c_sus:7,c_att:3,c_level:5.2,drvon:1,d_drive:1.8,d_tone:6,d_level:4.8}],
['Radio Crunch',{mode:1,gain:5.2,tight:4.0,bass:4.0,mid:7.2,treble:6.8,pres:6.6,depth:2.8,cab:5,mic:0,e1:-2,e2:-1,e3:2.5,e4:2,e5:-1.5,hpf:100,lpf:6500}],
['Broken Speaker',{mode:1,gain:4.8,tight:3.0,bass:3.2,mid:6.8,treble:3.8,pres:3.5,depth:2.5,cab:5,mic:2,e1:-3,e2:1,e3:3,e4:-2,e5:-4,hpf:140,lpf:4800}]
]);
add('CLEAN',[
['Frostline',{mode:0,gain:2.6,tight:2.0,bass:5.0,mid:5.5,treble:6.7,pres:6.2,depth:4.1,cab:4,mic:1,room:2.0,e4:1.0,e5:1.4,lpf:15000}],
['Studio Halo',{mode:0,gain:2.9,tight:2.2,bass:5.6,mid:5.9,treble:5.9,pres:5.4,depth:4.8,cab:1,mic:2,room:1.7,e2:.6,e3:.8}],
['Blue Hour',{mode:0,gain:3.3,tight:2.4,bass:4.7,mid:5.8,treble:6.4,pres:6.0,depth:3.9,cab:3,mic:1,room:2.8,e4:1.2,e5:1.1}],
['Clean Static',{mode:0,gain:2.1,tight:1.6,bass:5.9,mid:5.1,treble:6.1,pres:5.0,depth:4.7,cab:5,mic:2,room:1.2,e1:.9,e5:.7}]
]);
add('CRUNCH & ROCK',[
['Copper Sky',{mode:1,gain:5.0,tight:3.8,bass:5.7,mid:6.4,treble:5.9,pres:5.5,depth:4.3,cab:0,mic:0,drvon:1,d_drive:2.7,d_tone:6.1,d_level:5.1}],
['Roadburn 84',{mode:1,gain:5.9,tight:4.1,bass:5.3,mid:6.7,treble:6.0,pres:5.8,depth:4.0,cab:2,mic:0,drvon:1,d_drive:3.3,d_tone:6.0,d_level:5.4}],
['Rust & Chrome',{mode:1,gain:4.6,tight:3.1,bass:6.2,mid:5.8,treble:5.2,pres:4.8,depth:5.2,cab:3,mic:2,drvon:1,d_drive:2.4,d_tone:5.0,d_level:5.2,room:1.8}],
['Amp Room 77',{mode:1,gain:4.4,tight:2.9,bass:5.8,mid:6.2,treble:5.5,pres:5.0,depth:5.0,cab:1,mic:2,room:2.4,drvon:1,d_drive:2.1,d_tone:5.6,d_level:4.9}]
]);
add('MODERN METAL',[
['Carbon Vein',{mode:2,gain:7.4,tight:8.2,bass:3.5,mid:5.9,treble:5.9,pres:6.5,depth:3.0,cab:2,mic:0,drvon:1,d_drive:4.7,d_tight:8.7,d_tone:5.8,d_level:5.9,hpf:55,lpf:9800}],
['Glass Reaper',{mode:2,gain:6.5,tight:8.8,bass:3.0,mid:6.5,treble:5.7,pres:6.7,depth:2.6,cab:4,mic:1,drvon:1,d_drive:4.9,d_tight:9.1,d_tone:6.0,d_level:5.8,hpf:60,lpf:10500}],
['Night Reactor',{mode:2,gain:7.9,tight:7.1,bass:4.0,mid:5.0,treble:6.2,pres:6.5,depth:3.7,cab:3,mic:2,drvon:1,d_drive:4.6,d_tight:7.8,d_tone:5.7,d_level:5.9}],
['Vanta Edge',{mode:2,gain:6.9,tight:7.7,bass:3.8,mid:6.0,treble:6.3,pres:6.8,depth:2.9,cab:2,mic:0,drvon:1,d_drive:4.3,d_tight:8.2,d_tone:6.4,d_level:5.8}]
]);
add('DJENT & RHYTHM',[
['Knife Echo',{mode:2,gain:6.2,tight:9.4,bass:2.9,mid:6.8,treble:5.4,pres:6.7,depth:2.1,cab:4,mic:0,drvon:1,d_drive:5.4,d_tight:9.5,d_tone:5.5,d_level:5.8,hpf:70,lpf:9200}],
['Grid Lock',{mode:2,gain:7.0,tight:9.0,bass:3.1,mid:6.1,treble:5.1,pres:6.2,depth:2.4,cab:5,mic:2,drvon:1,d_drive:5.7,d_tight:9.2,d_tone:4.9,d_level:5.8}],
['Angular Punch',{mode:2,gain:6.7,tight:8.5,bass:3.3,mid:6.5,treble:5.8,pres:6.6,depth:2.7,cab:2,mic:1,drvon:1,d_drive:4.9,d_tight:8.9,d_tone:5.9,d_level:5.9}],
['Low Geometry',{mode:2,gain:7.3,tight:8.1,bass:4.5,mid:5.1,treble:4.9,pres:5.5,depth:4.2,cab:3,mic:2,drvon:1,d_drive:4.8,d_tight:8.4,d_tone:4.5,d_level:5.8}]
]);
add('DEATH & EXTREME',[
['Coffin Bloom',{mode:2,gain:8.5,tight:6.4,bass:5.0,mid:4.1,treble:5.0,pres:4.7,depth:5.7,cab:3,mic:2,drvon:1,d_drive:5.8,d_tight:7.0,d_tone:4.1,d_level:5.9,hpf:42,lpf:7600}],
['Iron Rot',{mode:2,gain:8.1,tight:7.5,bass:4.0,mid:4.6,treble:5.7,pres:5.6,depth:4.6,cab:2,mic:0,drvon:1,d_drive:5.3,d_tight:8.0,d_tone:5.0,d_level:5.8}],
['Ritual Grind',{mode:2,gain:8.8,tight:6.0,bass:5.4,mid:3.6,treble:4.6,pres:4.2,depth:6.0,cab:3,mic:2,drvon:1,d_drive:6.2,d_tight:6.6,d_tone:3.8,d_level:5.9,hpf:38,lpf:6800}],
['Severed Halo',{mode:3,gain:7.6,tight:6.0,bass:4.0,mid:5.2,treble:6.0,pres:6.3,depth:4.1,cab:2,mic:0,drvon:1,d_drive:5.0,d_tight:7.0,d_tone:6.0,d_level:5.8}]
]);
add('PROGRESSIVE',[
['Fractal Bloom',{mode:1,gain:5.0,tight:4.6,bass:4.9,mid:6.8,treble:6.2,pres:6.1,depth:3.6,cab:4,mic:1,drvon:1,d_drive:2.6,d_tone:6.4,d_level:5.1}],
['Glass Metric',{mode:2,gain:5.9,tight:6.5,bass:3.9,mid:6.7,treble:5.8,pres:6.4,depth:3.0,cab:2,mic:1,drvon:1,d_drive:3.4,d_tone:6.2,d_level:5.5}],
['Elastic Lead',{mode:3,gain:6.6,tight:5.2,bass:4.2,mid:7.2,treble:5.9,pres:6.3,depth:3.3,cab:4,mic:1,drvon:1,d_drive:3.4,d_tone:6.4,d_level:5.4}],
['Odd Horizon',{mode:1,gain:4.7,tight:4.1,bass:5.1,mid:6.4,treble:6.3,pres:6.0,depth:4.0,cab:1,mic:1,drvon:1,d_drive:2.2,d_tone:6.1,d_level:5.0,room:1.5}]
]);
add('LEAD',[
['Prism Solo',{mode:3,gain:7.2,tight:4.9,bass:4.1,mid:7.6,treble:6.0,pres:6.4,depth:3.2,cab:4,mic:1,drvon:1,d_drive:3.7,d_tone:6.5,d_level:5.4}],
['Velvet Fire',{mode:3,gain:7.0,tight:4.4,bass:4.8,mid:7.4,treble:5.3,pres:5.8,depth:4.1,cab:1,mic:1,drvon:1,d_drive:3.1,d_tone:5.9,d_level:5.3,room:1.6}],
['Arc Runner',{mode:3,gain:7.8,tight:5.5,bass:3.9,mid:7.1,treble:6.1,pres:6.7,depth:3.0,cab:2,mic:0,drvon:1,d_drive:4.1,d_tone:6.4,d_level:5.6,bston:1,b_gain:3.2,b_tone:6.4,b_level:5.6}],
['Satin Sustain',{mode:3,gain:6.5,tight:4.1,bass:4.7,mid:7.8,treble:5.0,pres:5.7,depth:4.5,cab:3,mic:2,drvon:1,d_drive:2.9,d_tone:5.3,d_level:5.2,room:2.0}]
]);
add('AMBIENT & TEXTURE',[
['Rain Signal',{mode:0,gain:2.7,tight:1.9,bass:5.2,mid:5.7,treble:6.9,pres:6.7,depth:4.2,cab:4,mic:1,room:7.2,e4:1.6,e5:2.0,lpf:15500}],
['Afterimage',{mode:1,gain:4.2,tight:2.8,bass:5.0,mid:5.9,treble:6.2,pres:6.0,depth:5.0,cab:1,mic:2,room:6.8,drvon:1,d_drive:1.9,d_tone:6.0,d_level:4.8}],
['Void Bloom',{mode:2,gain:5.1,tight:4.5,bass:5.5,mid:4.6,treble:4.5,pres:4.2,depth:6.3,cab:3,mic:2,room:7.0,lpf:7600}],
['Halo Dust',{mode:0,gain:3.1,tight:2.3,bass:4.9,mid:6.0,treble:6.8,pres:6.6,depth:4.0,cab:0,mic:1,room:6.5,e4:1.5,e5:1.7,lpf:15000}]
]);
add('SITAR & WORLD',[
['Raga Noir',{mode:4,gain:4.5,tight:3.4,bass:5.5,mid:6.0,treble:5.5,pres:5.5,depth:4.8,cab:3,mic:2,stron:1,s_buzz:7.0,s_res:7.0,s_tone:5.2,s_mix:7.5,room:1.7}],
['Jali Moon',{mode:4,gain:4.0,tight:2.9,bass:5.3,mid:6.4,treble:6.9,pres:7.0,depth:4.3,cab:1,mic:1,stron:1,s_buzz:5.5,s_res:8.0,s_tone:7.0,s_mix:8.0,room:2.2}],
['Raga Voltage',{mode:4,gain:5.8,tight:4.7,bass:4.6,mid:6.7,treble:6.2,pres:6.4,depth:3.5,cab:2,mic:0,stron:1,s_buzz:7.8,s_res:5.4,s_tone:6.2,s_mix:6.5,drvon:1,d_drive:2.8,d_tone:6.1,d_level:5.1}],
['Temple Bloom',{mode:4,gain:3.9,tight:2.7,bass:5.8,mid:6.1,treble:6.7,pres:6.8,depth:5.2,cab:0,mic:1,stron:1,s_buzz:4.5,s_res:8.5,s_tone:7.4,s_mix:8.0,room:2.6}]
]);
add('SPECIAL',[
['Drop Vector',{mode:2,gain:7.0,tight:8.0,bass:3.6,mid:5.7,treble:5.6,pres:6.0,depth:3.0,cab:2,mic:0,tunon:1,t_pitch:-2,t_blend:9,drvon:1,d_drive:4.8,d_tight:8.4,d_tone:5.4,d_level:5.8}],
['Octave Glass',{mode:0,gain:3.4,tight:3.0,bass:4.6,mid:6.2,treble:6.2,pres:6.0,depth:3.5,cab:4,mic:1,tunon:1,t_pitch:-12,t_blend:3,bston:1,b_gain:3.0,b_tone:6.2,b_level:5.0}],
['Tape Breaker',{mode:1,gain:5.5,tight:3.3,bass:4.1,mid:6.5,treble:4.1,pres:3.8,depth:2.9,cab:5,mic:2,e1:-2,e2:.5,e3:2.2,e4:-2,e5:-4,hpf:120,lpf:5200}],
['Glass Boost',{mode:0,gain:3.1,tight:3.2,bass:4.8,mid:6.5,treble:6.4,pres:6.3,depth:3.2,cab:1,mic:0,bston:1,b_gain:5.5,b_tone:6.6,b_level:5.8}]
]);
// Exactly six synth presets: the rest of the bank is guitar/amp focused.
add('SYNTH (6)',[
['Neon Blade',{mode:2,gain:6.2,tight:7.0,bass:4.0,mid:5.8,treble:5.8,pres:6.1,cab:2,mic:0,drvon:1,d_drive:3.8,d_tight:7.5,d_tone:5.8,d_level:5.5,synon:1,synmix:.78,synvoice:2,synwave:0,synsub:.35,syncut:3600,synres:.22,synatt:4,syndec:140,synsus:.62,synrel:170,syntrk:.82,synstab:.82,syndrive:2.8,synspread:.25,synmod:.3,synosc2:.72,syndetune:8,synpw:.5,synfilter:0,synenvamt:.65,synlforate:4,synlfodepth:.14,synglide:18,synnoise:.015}],
['FM Machine',{mode:2,gain:6.8,tight:7.5,bass:3.8,mid:5.5,treble:5.4,pres:6.0,cab:3,mic:2,drvon:1,d_drive:4.2,d_tight:8,d_tone:5,d_level:5.6,synon:1,synmix:.72,synvoice:5,synwave:3,synsub:.28,syncut:5200,synres:.28,synatt:2,syndec:180,synsus:.55,synrel:140,syntrk:.88,synstab:.9,syndrive:4.8,synspread:.18,synmod:.82,synosc2:.8,syndetune:5,synpw:.5,synfilter:0,synenvamt:.72,synlforate:6,synlfodepth:.2,synglide:10,synnoise:.01}],
['Glass Circuit',{mode:0,gain:3.2,tight:2.3,bass:5.2,mid:5.8,treble:6.4,pres:6.2,cab:4,mic:1,room:2.5,synon:1,synmix:.68,synvoice:0,synwave:3,synsub:.18,syncut:7200,synres:.12,synatt:8,syndec:260,synsus:.72,synrel:320,syntrk:.78,synstab:.88,syndrive:.8,synspread:.3,synmod:.18,synosc2:.55,syndetune:9,synpw:.5,synfilter:0,synenvamt:.4,synlforate:2.5,synlfodepth:.12,synglide:28,synnoise:.01}],
['Pulse Forge',{mode:2,gain:6.0,tight:7.6,bass:3.8,mid:6.0,treble:5.6,pres:6.2,cab:2,mic:0,drvon:1,d_drive:3.8,d_tight:8,d_tone:5.8,d_level:5.5,synon:1,synmix:.8,synvoice:6,synwave:1,synsub:.42,syncut:2800,synres:.36,synatt:1.5,syndec:100,synsus:.48,synrel:110,syntrk:.9,synstab:.86,syndrive:3.5,synspread:.35,synmod:.28,synosc2:.82,syndetune:-6,synpw:.32,synfilter:0,synenvamt:.78,synlforate:5.5,synlfodepth:.18,synglide:6,synnoise:.025}],
['Sub Horizon',{mode:2,gain:5.8,tight:6.4,bass:5.2,mid:5.0,treble:4.8,pres:5.0,depth:4.5,cab:3,mic:2,synon:1,synmix:.74,synvoice:7,synwave:0,synsub:.75,syncut:1800,synres:.2,synatt:12,syndec:240,synsus:.78,synrel:300,syntrk:.84,synstab:.92,syndrive:2.2,synspread:.12,synmod:.2,synosc2:.7,syndetune:4,synpw:.5,synfilter:0,synenvamt:.35,synlforate:2,synlfodepth:.1,synglide:35,synnoise:.008}],
['Pluck Reactor',{mode:3,gain:6.4,tight:5.8,bass:4.0,mid:6.8,treble:6.0,pres:6.5,cab:2,mic:1,drvon:1,d_drive:3.2,d_tight:6.8,d_tone:6,d_level:5.4,synon:1,synmix:.7,synvoice:3,synwave:0,synsub:.2,syncut:4600,synres:.3,synatt:.8,syndec:80,synsus:.28,synrel:120,syntrk:.9,synstab:.84,syndrive:3.8,synspread:.2,synmod:.42,synosc2:.65,syndetune:12,synpw:.5,synfilter:0,synenvamt:.9,synlforate:7,synlfodepth:.22,synglide:8,synnoise:.018}]
]);
add('AUTO-TUNE',[
['Major Lead Lock',{mode:3,gain:7.0,tight:4.8,bass:4.2,mid:7.2,treble:5.8,pres:6.2,cab:2,mic:1,drvon:1,d_drive:3.2,d_tone:6.1,d_level:5.4,aton:1,atkey:0,atscale:0,atspeed:78,atamount:92,athuman:22,atmix:100,attrack:.82}],
['Minor Night Lock',{mode:3,gain:7.3,tight:4.6,bass:4.6,mid:7.0,treble:5.3,pres:5.8,cab:3,mic:2,drvon:1,d_drive:3.4,d_tone:5.4,d_level:5.5,aton:1,atkey:9,atscale:1,atspeed:72,atamount:88,athuman:28,atmix:100,attrack:.8}],
['Dorian Glass Lock',{mode:1,gain:5.4,tight:4.0,bass:5.0,mid:6.4,treble:6.2,pres:6.0,cab:1,mic:1,drvon:1,d_drive:2.5,d_tone:6.2,d_level:5.1,aton:1,atkey:2,atscale:2,atspeed:64,atamount:84,athuman:34,atmix:96,attrack:.78}],
['Mixolydian Edge',{mode:1,gain:5.9,tight:4.2,bass:5.1,mid:6.6,treble:6.1,pres:5.8,cab:2,mic:0,drvon:1,d_drive:3.0,d_tone:6.0,d_level:5.3,aton:1,atkey:7,atscale:3,atspeed:70,atamount:90,athuman:24,atmix:100,attrack:.82}],
['Phrygian Bite',{mode:2,gain:7.4,tight:7.2,bass:3.8,mid:5.8,treble:5.3,pres:6.2,cab:2,mic:0,drvon:1,d_drive:4.5,d_tight:8.0,d_tone:5.4,d_level:5.7,aton:1,atkey:4,atscale:4,atspeed:82,atamount:94,athuman:16,atmix:100,attrack:.84}],
['Phrygian Dominant Fire',{mode:3,gain:7.6,tight:5.2,bass:4.2,mid:7.0,treble:5.9,pres:6.4,cab:2,mic:1,drvon:1,d_drive:4.0,d_tone:6.4,d_level:5.6,aton:1,atkey:4,atscale:5,atspeed:76,atamount:90,athuman:20,atmix:100,attrack:.84}],
['Natural Minor Sustain',{mode:3,gain:6.8,tight:4.2,bass:4.8,mid:7.3,treble:5.4,pres:5.9,cab:1,mic:1,room:2,drvon:1,d_drive:2.9,d_tone:5.8,d_level:5.3,aton:1,atkey:7,atscale:1,atspeed:52,atamount:78,athuman:42,atmix:92,attrack:.76}],
['C Major Precision',{mode:0,gain:3.4,tight:2.5,bass:5.3,mid:5.8,treble:6.3,pres:6.1,cab:1,mic:1,room:1.6,aton:1,atkey:0,atscale:0,atspeed:58,atamount:76,athuman:45,atmix:90,attrack:.74}],
['A Mixolydian Solo',{mode:3,gain:6.9,tight:4.5,bass:4.4,mid:7.1,treble:6.0,pres:6.4,cab:4,mic:1,drvon:1,d_drive:3.1,d_tone:6.5,d_level:5.4,aton:1,atkey:9,atscale:3,atspeed:74,atamount:86,athuman:30,atmix:96,attrack:.8}],
['D Phrygian Dominant Lead',{mode:3,gain:7.8,tight:5.0,bass:4.0,mid:7.4,treble:6.0,pres:6.6,cab:2,mic:0,drvon:1,d_drive:4.0,d_tone:6.5,d_level:5.6,aton:1,atkey:2,atscale:5,atspeed:84,atamount:95,athuman:12,atmix:100,attrack:.86}]
]);
const PRE={};Object.values(CATS).forEach(c=>Object.assign(PRE,c));

// ---- bridge to the plugin: plain same-origin requests answered by the plugin (no JUCE JS needed) ----
const inPlugin=location.hostname==='juce.backend';
const R={},M={},V={},L={},T={};
D.forEach(([id,l,mn,mx,df,u,st])=>{R[id]=[mn,mx,df,st];M[id]={l,u};V[id]=df;L[id]=[];T[id]=0});
const $=id=>document.getElementById(id),get=id=>V[id];
const fire=id=>L[id].forEach(f=>f());
const clampv=(id,v)=>{const[mn,mx,,st]=R[id];return +Math.min(mx,Math.max(mn,Math.round((v-mn)/st)*st+mn)).toFixed(4)};
function showErr(m){const e=$('err');e.textContent=m;e.style.display='block'}
let seq=0,failed=false;
const call=path=>fetch('/shz/'+path+'?_='+(++seq),{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json()});
const tell=p=>p.catch(e=>{if(!failed){failed=true;showErr('Plugin link failed: '+e)}});
const N=inPlugin?{
  set:(id,v)=>tell(call('set/'+id+'/'+v)),
  sets:o=>tell(call('sets/'+Object.entries(o).map(([k,v])=>k+':'+v).join(','))),
  gest:(id,on)=>tell(call('g/'+id+'/'+on)),
  all:()=>call('all'),poll:()=>call('poll'),
  ld:()=>tell(call('loadIR')),cl:()=>tell(call('clearIR'))}:null;
const gs=id=>{if(N)N.gest(id,1)},ge=id=>{if(N)N.gest(id,0)};
const put=(id,v)=>{v=clampv(id,v);if(v===V[id])return;V[id]=v;T[id]=performance.now();fire(id);if(N)N.set(id,v)};
const commit=(id,v)=>{gs(id);put(id,v);ge(id)};
const putMany=o=>{const out={};Object.entries(o).forEach(([k,v])=>{if(!(k in V)||!(k in R))return;v=clampv(k,v);V[k]=v;T[k]=performance.now();out[k]=v});
  Object.keys(out).forEach(fire);if(N)N.sets(out)};
const onChange=(ids,f)=>{[].concat(ids).forEach(i=>L[i].push(f))};
if(N){try{const a=await N.all();Object.keys(a).forEach(k=>{if(k in V)V[k]=a[k]})}catch(e){showErr('Could not read plugin state: '+e)}}

function mk(id,fader){
  const [mn,mx,df,st]=R[id],m=M[id],dec=st<1?1:0,e=document.createElement('div');
  e.className=fader?'f':'k';e.tabIndex=0;e.setAttribute('role','slider');e.title=m.l+': drag up or down, scroll, double-click to reset';
  e.innerHTML=(fader?'<div class="ft"><b></b></div>':'<div class="kw"><div class="kr"></div><div class="kb"><i></i></div></div>')+'<span class="kv"></span><span class="kl">'+m.l+'</span>';
  const kr=e.querySelector('.kr'),kb=e.querySelector('.kb'),cap=e.querySelector('.ft b'),kv=e.querySelector('.kv');
  const show=()=>{const v=get(id),n=(v-mn)/(mx-mn);let label=v.toFixed(dec)+m.u;
    if(id==='synfilter')label=['LP','HP','BP'][Math.round(v)]||label;
    if(id==='synvoice')label=['Glass','Classic','Modern','Pluck','Air','FM','Pulse','Bass'][Math.round(v)]||label;
    kv.textContent=label;e.setAttribute('aria-valuenow',v);
    if(fader)cap.style.bottom=n*100+'%';else{kr.style.setProperty('--a',n*270+'deg');kb.style.transform='rotate('+(-135+n*270)+'deg)'}};
  let down=false,sy,sv;
  e.onpointerdown=ev=>{e.setPointerCapture(ev.pointerId);down=true;sy=ev.clientY;sv=get(id);gs(id)};
  e.onpointermove=ev=>{if(down)put(id,sv+(sy-ev.clientY)/(ev.shiftKey?700:fader?130:170)*(mx-mn))};
  e.onpointerup=e.onpointercancel=()=>{if(down){down=false;ge(id)}};
  e.addEventListener('wheel',ev=>{ev.preventDefault();commit(id,get(id)+(ev.deltaY<0?1:-1)*st*(ev.shiftKey?1:Math.max(1,(mx-mn)/(st*50))))},{passive:false});
  e.ondblclick=()=>commit(id,df);
  e.onkeydown=ev=>{const d={ArrowUp:1,ArrowRight:1,ArrowDown:-1,ArrowLeft:-1}[ev.key];if(d){ev.preventDefault();commit(id,get(id)+d*st*(ev.shiftKey?10:1))}};
  onChange(id,show);show();return e;
}
function tg(id,label){const wrap=document.createElement('div');wrap.className='tg';const b=document.createElement('button');b.type='button';b.setAttribute('aria-pressed','false');b.onclick=ev=>{ev.preventDefault();ev.stopPropagation();commit(id,get(id)>.5?0:1);};const s=()=>{const on=get(id)>.5;b.textContent=on?'ON':'OFF';b.classList.toggle('on',on);b.classList.toggle('off',!on);b.setAttribute('aria-pressed',String(on));b.title=on?label+' is enabled — click to bypass':label+' is bypassed — click to enable'};onChange(id,s);s();wrap.appendChild(b);return wrap}
function ch(id,names){const w=document.createElement('div');w.className='ch';names.forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.textContent=n;b.onclick=ev=>{ev.preventDefault();commit(id,i)};w.appendChild(b)});
  const s=()=>[...w.children].forEach((b,i)=>b.classList.toggle('on',i===Math.round(get(id))));onChange(id,s);s();return w}
function mount(root){
  root.querySelectorAll('[data-k]').forEach(p=>p.replaceWith(mk(p.dataset.k)));
  root.querySelectorAll('[data-f]').forEach(p=>p.replaceWith(mk(p.dataset.f,1)));
  root.querySelectorAll('[data-tg]').forEach(p=>p.replaceWith(tg(p.dataset.tg,p.dataset.l||'On')));
  root.querySelectorAll('[data-ch]').forEach(p=>{const c=ch(p.dataset.ch,p.dataset.n.split(','));if(p.getAttribute('style'))c.setAttribute('style',p.getAttribute('style'));p.replaceWith(c)});
}

// pedals
const G={drv:'<path d="M3 20 L12 20 Q18 4 22 4 Q26 4 32 20 L43 20"/>',bst:'<path d="M8 28 L23 10 L38 28 M8 36 L23 18 L38 36"/>',cmp:'<path d="M4 8 L42 18 M4 32 L42 22"/>',tun:'<path d="M23 6 V30 M12 20 L23 32 L34 20 M8 36 H38"/>',sit:'<circle cx="23" cy="31" r="7"/><path d="M23 24 V3 M19 8 H27 M20 13 H26 M20 18 H26 M17 5 L20 5 M26 5 L29 5"/>'};
const PEDS=[['drv','HZ DRIVE','linear-gradient(#2b2e33,#16181b)',['d_drive','d_tone','d_level','d_tight'],'drvon'],
['bst','HZ BOOST','linear-gradient(#262b36,#14171e)',['b_gain','b_tone','b_level'],'bston'],
['cmp','HZ COMP','linear-gradient(#26302f,#141a19)',['c_sus','c_att','c_level'],'cmpon'],
['tun','HZ DROP','linear-gradient(#302a2a,#191515)',['t_pitch','t_blend'],'tunon'],
['sit','HZ SITAR','linear-gradient(#3d301b,#1d160c)',['s_buzz','s_res','s_tone','s_mix'],'stron']];
$('peds').innerHTML=PEDS.map(([g,n,bg,ks,on])=>`<div class="ped" style="background:${bg}"><div class="rw">${ks.map(k=>`<div data-k="${k}"></div>`).join('')}</div><svg class="gl" viewBox="0 0 46 40">${G[g]}</svg><div class="nm">${n}</div><button class="fs" data-on="${on}" title="Footswitch"></button><i class="led" data-led="${on}"></i></div>`).join('');
document.querySelectorAll('.fs').forEach(b=>{const id=b.dataset.on,l=b.parentNode.querySelector('.led');b.type='button';b.onclick=ev=>{ev.preventDefault();commit(id,get(id)>.5?0:1)};const s=()=>l.classList.toggle('on',get(id)>.5);onChange(id,s);s()});

// amp grille: a different grille for each amp style
const head=document.querySelector('.head');
function grille(m){
  let h='';
  if(m==0){ // clean: woven cloth with a diamond lattice
    for(let i=-4;i<30;i++){const x=i*26;h+=`<path d="M${x} 0 L${x+190} 190 M${x+190} 0 L${x} 190" stroke="#5b4526" stroke-width="1.2" opacity=".55" fill="none"/>`}
    h+='<rect x="8" y="8" width="644" height="174" fill="none" stroke="#5b4526" stroke-width="2" opacity=".7"/>';
  }else if(m==1){ // crunch: perforated plate, amber backlight
    for(let r=0;r<12;r++)for(let c=0;c<44;c++){const x=18+c*14.5+(r%2?7:0),y=14+r*15;if(x<648)h+=`<circle cx="${x}" cy="${y}" r="3.2" fill="var(--glow)" opacity="${.45+.5*Math.abs(Math.sin(c*.31+r*.4))}"/>`}
  }else if(m==2){ // modern: layered waveform slits with contour lines and a hot centre
    h='<defs><linearGradient id="gm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd6ee" stop-opacity=".35"/><stop offset=".5" stop-color="#f2fdff"/><stop offset="1" stop-color="#7fd6ee" stop-opacity=".35"/></linearGradient></defs>';
    let back='',front='',top=[],bot=[];
    for(let i=0;i<58;i++){const a=.22+.78*Math.abs(Math.sin(i*.27)*Math.cos(i*.065)),H=a*150,x=14+i*11,y=(190-H)/2;
      back+=`<rect x="${x-1.5}" y="${y-9}" width="8" height="${H+18}" rx="4" fill="var(--glow)" opacity=".13"/>`;
      front+=`<rect x="${x}" y="${y}" width="5" height="${H}" rx="2.5" fill="url(#gm)"/>`;
      top.push((x+2.5)+','+(y-9));bot.push((x+2.5)+','+(y+H+9))}
    h+=back+`<polyline points="${top.join(' ')}" fill="none" stroke="var(--glow)" stroke-width="1" opacity=".5"/><polyline points="${bot.join(' ')}" fill="none" stroke="var(--glow)" stroke-width="1" opacity=".5"/><path d="M8 95H652" stroke="var(--glow)" stroke-width=".6" opacity=".4"/>`+front;
    h+='<path d="M8 10H40M8 10V30M652 10H620M652 10V30M8 180H40M8 180V160M652 180H620M652 180V160" stroke="var(--glow)" stroke-width="1.2" fill="none" opacity=".7"/>';
  }else if(m==4){ // sitar signature: carved jali lattice of eight-pointed stars, lit from behind
    for(let r=0;r<4;r++)for(let k=0;k<14;k++){const cx=44+k*44,cy=29+r*44,q=15.8;
      h+=`<g transform="translate(${cx} ${cy})"><rect x="${-q}" y="${-q}" width="${2*q}" height="${2*q}" fill="var(--glow)" fill-opacity=".2" stroke="var(--glow)" stroke-width="1.2"/><rect x="${-q}" y="${-q}" width="${2*q}" height="${2*q}" transform="rotate(45)" fill="var(--glow)" fill-opacity=".2" stroke="var(--glow)" stroke-width="1.2"/><circle r="4.4" fill="var(--glow)"/></g>`}
    h+='<rect x="6" y="6" width="648" height="178" fill="none" stroke="var(--glow)" stroke-width="2" opacity=".6"/>';
  }else{ // lead: angular slashes
    for(let i=0;i<32;i++){const x=16+i*20,len=60+110*Math.abs(Math.sin(i*.55+1)),y1=(190-len)/2,y2=y1+len,sk=26;h+=`<polygon points="${x},${y1} ${x+7},${y1} ${x+7+sk},${y2} ${x+sk},${y2}" fill="var(--glow)"/>`}
  }
  const s=$('gr');s.style.opacity=0;s.innerHTML=h;requestAnimationFrame(()=>s.style.opacity=1);
}
const setStyle=()=>{const m=Math.round(get('mode'));head.dataset.m=m;grille(m)};
onChange('mode',setStyle);setStyle();

// cab drawing
function cabDraw(){const mode=Math.round(get('cab')),s=$('cabsvg');
  const sp=mode===0?[[210,135,92]]:mode===1?[[210,70,52],[210,200,52]]:mode===2?[[135,70,52],[285,70,52],[135,200,52],[285,200,52]]:mode===3?[[135,70,52],[285,70,52],[135,200,52],[285,200,52]]:mode===4?[[145,90,62],[275,90,62],[210,205,58]]:[[125,75,45],[210,75,45],[295,75,45],[125,185,45],[210,185,45],[295,185,45]];
  s.innerHTML=`<rect x="14" y="10" width="392" height="250" rx="8" fill="#0d0e10" stroke="#2a2d33"/><rect x="28" y="24" width="364" height="222" fill="#07080a" stroke="#1c1e22"/>`+
  sp.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#101214" stroke="#2f333a" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r*.72}" fill="none" stroke="#1d2025"/><circle cx="${x}" cy="${y}" r="${r*.3}" fill="#0a0b0c" stroke="#2a2d33"/>`).join('')+
  `<text x="210" y="256" fill="#868b93" font-size="9" letter-spacing="4" text-anchor="middle">SISHHIN</text>`}
onChange('cab',cabDraw);cabDraw();

// EQ
$('eqr').innerHTML='<div data-k="hpf"></div>'+[1,2,3,4,5].map(i=>`<div class="band"><div data-f="e${i}"></div><div data-k="f${i}"></div></div>`).join('')+'<div data-k="lpf"></div>';
const eqc=$('eqc'),x2=eqc.getContext('2d');
function eqDraw(){const W=eqc.width,H=eqc.height;x2.clearRect(0,0,W,H);x2.strokeStyle='#1d2025';x2.lineWidth=1;
  [-10,0,10].forEach(db=>{const y=H/2-db/18*H;x2.beginPath();x2.moveTo(0,y);x2.lineTo(W,y);x2.stroke()});
  x2.strokeStyle='#7fd6ee';x2.lineWidth=2;x2.beginPath();
  for(let px=0;px<=W;px+=3){const f=20*Math.pow(1000,px/W),l=Math.log(f);let db=0;
    for(let i=1;i<=5;i++){const g=get('e'+i),f0=Math.log(get('f'+i));
      db+=i==1?g/(1+Math.exp(3*(l-f0))):i==5?g/(1+Math.exp(-3*(l-f0))):g*Math.exp(-Math.pow(l-f0,2)/(2*.5*.5))}
    db-=Math.max(0,Math.log2(get('hpf')/f))*12;db-=Math.max(0,Math.log2(f/get('lpf')))*12;
    const y=H/2-Math.max(-18,Math.min(18,db))/18*H/2*1.0;px?x2.lineTo(px,y):x2.moveTo(px,y)}
  x2.stroke()}
onChange(['e1','e2','e3','e4','e5','f1','f2','f3','f4','f5','hpf','lpf'],eqDraw);

// AutoTune readout / scale map
const noteNames=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const scaleNames=['MAJOR','NAT MINOR','DORIAN','MIXOLYDIAN','PHRYGIAN','PHRYGIAN DOM'];
const scalePills=$('scalePills');
scaleNames.forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.textContent=n;b.onclick=ev=>{ev.preventDefault();commit('atscale',i)};scalePills.appendChild(b)});
onChange(['atkey','atscale'],()=>{[...scalePills.children].forEach((b,i)=>b.classList.toggle('on',i===Math.round(get('atscale'))));});
function tunePaint(cents){const c=Math.max(-50,Math.min(50,cents||0));const t=(c+50)/100;const m=$('tuneMeter');if(m)m.style.width=(t*100)+'%';const w=$('tuneWheel');if(w)w.style.setProperty('--needle',(-42+84*t)+'deg');const e=$('tuneCents');if(e)e.textContent=(c>0?'+':'')+Math.round(c)+'¢'}
function tuneRead(d){const f=Number(d.tuneFreq||0),target=Number(d.tuneTarget||0),c=Number(d.tuneCents||0),n=Number(d.tuneNote||-1);$('tuneFreq').textContent=f>0?f.toFixed(1):'0.0';$('tuneTarget').textContent=target>0?target.toFixed(1):'0.0';$('tuneNote').textContent=n>=0?noteNames[((n%12)+12)%12]:'--';tunePaint(c)}
tunePaint(0);

// nav
const IC={tune:'<path d="M3 12h4l2-7 4 14 2-7h6"/><circle cx="12" cy="12" r="9" fill="none"/>',synth:'<path d="M4 18 L8 8 L12 15 L16 5 L20 18"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="5" r="1.5"/>' ,pedals:'<rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="9" r="2.5"/><circle cx="12" cy="16" r="1.5"/>',amp:'<rect x="2" y="7" width="20" height="10" rx="1"/><path d="M5 12h14"/>',cab:'<rect x="4" y="3" width="16" height="18" rx="1"/><circle cx="12" cy="12" r="5"/>',eq:'<path d="M6 4v16M12 4v16M18 4v16"/><circle cx="6" cy="9" r="2" fill="#090a0c"/><circle cx="12" cy="15" r="2" fill="#090a0c"/><circle cx="18" cy="8" r="2" fill="#090a0c"/>'};
Object.keys(IC).forEach(k=>{const b=document.createElement('button');b.type='button';b.title=k[0].toUpperCase()+k.slice(1);b.innerHTML=`<svg viewBox="0 0 24 24">${IC[k]}</svg><span>${k}</span>`;b.classList.toggle('on',k==='amp');
  b.onclick=()=>{document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('show',p.id==='p-'+k));[...$('nav').children].forEach(c=>c.classList.toggle('on',c===b));if(k==='eq')eqDraw()};$('nav').appendChild(b)});

mount(document.body);

// synth waveform selector
const waveNames=['SAW','SQUARE','TRI','SINE','HYBRID'];
const sw=$('synwave');
waveNames.forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.textContent=n;b.onclick=ev=>{ev.preventDefault();commit('synwave',i)};sw.appendChild(b)});
onChange('synwave',()=>[...sw.children].forEach((b,i)=>b.classList.toggle('on',i===Math.round(get('synwave')))));
const voiceNames=['GLASS','CLASSIC','MODERN','PLUCK','AIR','FM METAL','PULSE','BASS'];
const sv=$('synvoice');
voiceNames.forEach((n,i)=>{const b=document.createElement('button');b.type='button';b.textContent=n;b.onclick=ev=>{ev.preventDefault();commit('synvoice',i)};sv.appendChild(b)});
onChange('synvoice',()=>[...sv.children].forEach((b,i)=>b.classList.toggle('on',i===Math.round(get('synvoice')))));
const sc=$('sync'),sx=sc.getContext('2d');
function synthDraw(){
  const W=sc.width,H=sc.height;sx.clearRect(0,0,W,H);
  sx.strokeStyle='#24182d';sx.lineWidth=1;
  for(let y=20;y<H;y+=30){sx.beginPath();sx.moveTo(0,y);sx.lineTo(W,y);sx.stroke()}
  sx.strokeStyle='#7fd6ee';sx.lineWidth=2;sx.beginPath();
  const wave=Math.round(get('synwave')),voice=Math.round(get('synvoice')),cut=get('syncut'),res=get('synres'),pw=get('synpw');
  for(let x=0;x<W;x+=2){
    const p=x/W*8;let y;
    if(wave===0)y=2*(p-Math.floor(p+.5));
    else if(wave===1)y=(p%1)<pw?1:-1;
    else if(wave===2)y=1-4*Math.abs((p%1)-Math.floor((p%1)+.5));
    else if(wave===3)y=Math.sin(p*Math.PI*2);
    else y=.68*(2*(p-Math.floor(p+.5)))+.32*Math.sin(p*Math.PI*4);
    const filt=.35+.65*Math.min(1,cut/7000);
    const voiceGain=[1,.95,1.05,.9,1.15,1.2,1,.92][voice];
    y*=filt*voiceGain*(1+.18*res*Math.sin(p*3));
    const yy=H*.52-y*H*.34;
    x?sx.lineTo(x,yy):sx.moveTo(x,yy);
  }
  sx.strokeStyle='#7fd6ee';sx.stroke();
  sx.strokeStyle='#ffffff18';sx.beginPath();sx.moveTo(0,H*.52);sx.lineTo(W,H*.52);sx.stroke();
}
onChange(['synwave','synvoice','syncut','synres','synmod','synpw','synlfodepth','synon'],()=>{synthDraw();document.querySelector('.syn-card')?.classList.toggle('bypassed',get('synon')<.5)});synthDraw();

// presets + A/B
{const o=document.createElement('option');o.textContent='Select preset…';o.value='';$('preset').appendChild(o)}
Object.entries(CATS).forEach(([c,ps])=>{const g=document.createElement('optgroup');g.label=c;Object.keys(ps).forEach(k=>{const o=document.createElement('option');o.textContent=k;o.value=k;g.appendChild(o)});$('preset').appendChild(g)});
const presetNames=Object.keys(PRE);$('presetCount').textContent=presetNames.length+' PRESETS';
const snap=()=>Object.fromEntries(D.map(d=>[d[0],get(d[0])])),restore=o=>putMany(o);
const load=n=>{if(!PRE[n])return;const b={};D.forEach(([id,,,,df])=>{if(!/on$/.test(id)||id==='gateon')b[id]=df});b.drvon=1;b.bston=0;b.cmpon=0;b.tunon=0;b.stron=0;b.synon=0;b.aton=0;b.atkey=0;b.atscale=0;b.t_pitch=-2;restore({...b,...PRE[n]});$('preset').value=n};
$('preset').onchange=ev=>{if(ev.target.value)load(ev.target.value)};
const stepP=d=>{const s=$('preset');if(!presetNames.length)return;let i=presetNames.indexOf(s.value);if(i<0)i=d>0?0:presetNames.length-1;else i=(i+d+presetNames.length)%presetNames.length;load(presetNames[i])};
$('prev').type='button';$('next').type='button';$('prev').onclick=ev=>{ev.preventDefault();stepP(-1)};$('next').onclick=ev=>{ev.preventDefault();stepP(1)};
const sl={a:null,b:null};let cur='a';
const pick=s=>{if(s===cur)return;sl[cur]=snap();const f=sl[cur];cur=s;if(!sl[s])sl[s]=f;restore(sl[s]);$('ab-a').classList.toggle('on',s==='a');$('ab-b').classList.toggle('on',s==='b')};
$('ab-a').type='button';$('ab-b').type='button';$('ab-a').onclick=ev=>{ev.preventDefault();pick('a')};$('ab-b').onclick=ev=>{ev.preventDefault();pick('b')};
eqDraw();

// meters, host automation and IR name come from the plugin by polling
const mt=(e,v)=>{const d=20*Math.log10(v+1e-5);e.style.width=Math.max(0,Math.min(100,(d+60)/60*100))+'%';e.classList.toggle('hot',d>-3)};
if(N){const b=$('irbtn'),x=$('irclr');let irn=null;
  const show=n=>{b.textContent=n?('IR: '+n):'Load WAV IR';x.style.display=n?'inline-block':'none'};
  b.disabled=false;b.onclick=()=>N.ld();x.onclick=()=>N.cl();
  const tick=async()=>{try{const d=await N.poll();mt($('m-in'),d.in);mt($('m-out'),d.out);tuneRead(d);
      if(d.ir!==irn){irn=d.ir;show(irn)}
      const now=performance.now();Object.keys(d.p||{}).forEach(k=>{if(!(k in V)||now-T[k]<500)return;if(Math.abs(d.p[k]-V[k])>1e-4){V[k]=d.p[k];fire(k)}});
    }catch(e){if(!failed){failed=true;showErr('Plugin link failed: '+e)}}setTimeout(tick,40)};
  tick()}
}catch(e){const b=document.getElementById('err');b.textContent='UI error: '+e;b.style.display='block'}})();
