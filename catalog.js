'use strict';
(()=>{
const VARIANTS={
  Common:{mult:1,chance:.70,color:'#dce4ef',fx:'soft'},
  Rare:{mult:1.55,chance:.20,color:'#64d3ff',fx:'glass'},
  Epic:{mult:2.25,chance:.08,color:'#d578ff',fx:'harmonic'},
  Legendary:{mult:3.5,chance:.02,color:'#ffd15f',fx:'sparkle'}
};

const ISLANDS={
  groove:{name:'Verdant Groove',type:'ISLAND I - GARDEN GROOVE',desc:'Leaves, drums, horns and chirps lock into a bright opening song.',theme:'groove',mark:'VG',unlockLevel:1,unlockCost:0,lifeStars:0,decor:['fern','bloom','stone','reed','mushroom','vine'],root:220},
  frost:{name:'Frostbell Atoll',type:'ISLAND II - CRYSTAL CHOIR',desc:'Glassy bells, snowy percussion and wide choir notes shimmer over the ice.',theme:'frost',mark:'FA',unlockLevel:4,unlockCost:8000,lifeStars:0,decor:['spire','crystal','pine','ice','facet','snow'],root:261.63},
  ember:{name:'Ember Circuit',type:'ISLAND III - VOLTAGE STAGE',desc:'Molten marimba, sub bass, sparks and machines turn the island into a festival.',theme:'ember',mark:'EC',unlockLevel:8,unlockCost:25000,lifeStars:0,decor:['vent','gear','basalt','coil','plate','flare'],root:185},
  moon:{name:'Moonlit Reverie',type:'ISLAND IV - CELESTIAL DREAM',desc:'Harp, celesta, distant choir and starlight percussion build a floating night song.',theme:'moon',mark:'MR',unlockLevel:12,unlockCost:45000,lifeStars:10,decor:['crescent','prism','orb','pillar','cloud','ring'],root:293.66},
  reef:{name:'Tideglass Reef',type:'ISLAND V - DEEPWATER ENSEMBLE',desc:'Pressure snaps, glass fins, shell bass and slow current chords move like an underwater orchestra.',theme:'reef',mark:'TR',unlockLevel:16,unlockCost:72000,lifeStars:18,decor:['coral','kelp','shell','pearl','arch','bubble'],root:196}
};

const MONSTERS=[
  // Verdant Groove — 10 regular + 1 island titan
  ['spriggle','Spriggle','groove','Leaf','pluck',350,22,5,'leaf',['#75df6b','#2eaa62','#d6ff93'],'A leafy little plucker that snaps its stem like a tiny string instrument.'],
  ['drumroot','Drumroot','groove','Earth','kick',700,38,8,'root',['#b77a46','#6cb64e','#f4c879'],'Its hollow roots thump the ground in a warm, bouncy beat.'],
  ['pufflehorn','Pufflehorn','groove','Air','horn',1200,62,12,'puff',['#e7a6da','#9a6ad6','#ffd6ef'],'A fluffy horn singer with a surprisingly enormous brass voice.'],
  ['shellody','Shellody','groove','Water','bell',1900,86,18,'shell',['#69d5e9','#3678c4','#c3f8ff'],'Taps the ridges of its shell to ring clean watery notes.'],
  ['chirplet','Chirplet','groove','Song','chirp',2800,118,24,'bird',['#ffd25a','#f47767','#fff0a8'],'A tiny three-note vocalist that never misses its entrance.','Songster'],
  ['bloombass','Bloombass','groove','Bloom','bass',3600,145,28,'flower',['#ff8fc8','#4cbd6b','#fff0a5'],'A flower-backed bass singer whose petals bounce on every downbeat.'],
  ['vinebell','Vinebell','groove','Vine','chime',4300,170,32,'vine',['#76d15b','#387d4b','#ffe783'],'Its curling vines hold tiny bells that sway in perfect time.'],
  ['dewdropper','Dewdropper','groove','Dew','kalimba',5200,205,36,'slime',['#72e6d2','#45a5c3','#dffff7'],'Plucks little droplets like a thumb piano.'],
  ['twiggle','Twiggle','groove','Wood','clack',6100,242,40,'stag',['#bd8c53','#5eaf62','#ecce8b'],'Knocks its wooden antlers together for a crisp clack groove.'],
  ['mossmara','Mossmara','groove','Moss','choir',7600,295,46,'moth',['#8cd879','#596db8','#d9ffd0'],'A mossy moth whose wingbeats make a soft humming choir.'],
  ['heartwood','Heartwood Harmonizer','groove','Heartwood','heaven',18000,620,60,'tower',['#86e26e','#38643e','#ffe285'],'The island titan. Its living wooden pipes turn the whole garden into a cathedral.', 'Island Titan',true,260,5],

  // Frostbell Atoll
  ['glisswing','Glisswing','frost','Ice','choir',4200,160,30,'wing',['#c8f2ff','#6db4ef','#f6fdff'],'Crystal feathers whistle a smooth sliding harmony.'],
  ['crystoad','Crystoad','frost','Crystal','mallet',5200,190,34,'toad',['#7ee8ee','#5f79df','#d8ffff'],'A squat crystal drummer that plays its own sparkling back.'],
  ['snowbongo','Snowbongo','frost','Snow','snare',6800,228,38,'bongo',['#dfefff','#7a9fd2','#ffffff'],'Two frost drums and one goofy grin. Somehow, it works.'],
  ['chimecub','Chimecub','frost','Bell','chime',8500,280,44,'cub',['#b8ddff','#6c77d1','#edf7ff'],'A cuddly bell-beast whose antlers ring when it hops.'],
  ['echoowl','Echoowl','frost','Echo','pad',11000,350,50,'owl',['#8e79d7','#403d83','#d5cfff'],'Sings one note, then throws its echo across the whole atoll.','Mythic'],
  ['icicello','Icicello','frost','Cello','cello',12600,402,54,'jelly',['#9cecff','#4268ba','#f4ffff'],'Its icicle arms bow a deep frozen cello tone.'],
  ['flurrit','Flurrit','frost','Flurry','flute',13900,455,58,'bird',['#f3fbff','#7db3ec','#a9eeff'],'A tiny snow flutist with breathy, dancing runs.'],
  ['glacitone','Glacitone','frost','Glacier','glass',15200,510,62,'orb',['#7ef0ff','#5566c9','#e8ffff'],'A floating glass orb that sings when its rings collide.'],
  ['sleetbeat','Sleetbeat','frost','Sleet','hihat',16800,575,66,'bug',['#c6edff','#6378a9','#ffffff'],'Taps sleet-crystals into a bright, fast hi-hat pattern.'],
  ['prismoth','Prismoth','frost','Prism','arp',19000,650,70,'moth',['#c8a8ff','#59c9ea','#fff6ff'],'Splits one tone into a rainbow arpeggio with every wingbeat.'],
  ['cryocantor','Cryocantor-X','frost','Aurora Core','heaven',30000,980,78,'tower',['#b7f2ff','#6656b3','#ffffff'],'The frost titan. Aurora pipes and crystal choirs bloom into enormous suspended chords.','Island Titan',true,420,7],

  // Ember Circuit
  ['sparko','Sparko','ember','Volt','zap',14500,430,52,'spark',['#ffe45d','#f28c35','#fff8bb'],'A hyper little voltage singer that crackles right on beat.'],
  ['magmarimba','Magmarimba','ember','Magma','marimba',18000,520,56,'magma',['#ff7b48','#9f3039','#ffc164'],'Plays lava-rock bars across its back like a volcanic marimba.'],
  ['coilcat','Coilcat','ember','Coil','bass',23000,640,60,'cat',['#65e2ff','#3b4f94','#baf7ff'],'Purrs sub-bass through a glowing coil wrapped around its tail.'],
  ['beatbug','Beatbug','ember','Circuit','tick',30000,780,64,'bug',['#80f0a8','#263b4c','#d4ffe2'],'A clockwork bug whose feet create an impossibly tight rhythm.'],
  ['furnacefin','Furnacefin','ember','Furnace','timpani',33500,850,68,'crab',['#ff9b42','#7d2934','#ffd277'],'A molten little beast that booms like a floor tom.'],
  ['voltelope','Voltelope','ember','Static','synthlead',37000,920,72,'stag',['#6ef2ff','#4358d1','#fff068'],'Its antlers arc melodic electricity from note to note.'],
  ['cinderclick','Cinderclick','ember','Cinder','clack',40500,1000,76,'bug',['#ff784a','#4a2e42','#ffd380'],'Clicks heated plates together for a sharp industrial rhythm.'],
  ['gearling','Gearling','ember','Gear','hihat',45000,1100,80,'machine',['#8ad8d7','#48506e','#f2d783'],'A tiny machine whose spinning teeth make metallic percussion.'],
  ['ashvox','Ashvox','ember','Ash','choir',49000,1210,84,'ghost',['#c9c2c7','#5d475d','#ffb78a'],'A smoky vocalist that drifts through the mix like a ghost choir.'],
  ['neonix','Neonix','ember','Neon','arp',54000,1340,88,'orb',['#ff69db','#3a63e9','#8effff'],'A neon oscillator that spits out a relentless arpeggio.'],
  ['resonator','Resonator-X','ember','Core','titan',65000,1800,90,'machine',['#77dcff','#5042a3','#ffe36d'],'The circuit titan. It drops a massive power-grid chord that makes the entire island feel twice as large.','Island Titan',true,600,9],

  // Moonlit Reverie
  ['lumibun','Lumibun','moon','Lumen','harp',22000,610,48,'puff',['#fff0c4','#7b67c8','#fff9ed'],'Plucks luminous whiskers like a miniature harp.'],
  ['nocturnote','Nocturnote','moon','Night','flute',25000,680,52,'bat',['#8175cf','#29305f','#c2e8ff'],'A moon-bat that breathes soft flute lines between the stars.'],
  ['starwhisp','Starwhisp','moon','Star','celesta',28500,760,56,'ghost',['#e8f5ff','#8f79db','#fff5b2'],'A little wisp that taps sparkling celesta notes into the air.'],
  ['moondrum','Moondrum','moon','Moon','timpani',32000,850,60,'bongo',['#ddd7ff','#7565a8','#f5f3ff'],'A gentle lunar drummer with huge, warm low-end pulses.'],
  ['cometail','Cometail','moon','Comet','bell',36000,945,64,'cat',['#8ae9ff','#6552a5','#fff59a'],'Its comet tail rings like a distant bell as it circles the stage.'],
  ['dreamhorn','Dreamhorn','moon','Dream','choir',41000,1050,68,'stag',['#f1d7ff','#8064b2','#fff6ff'],'Sings a breathy choir tone through antlers shaped like crescents.'],
  ['orbitaloop','Orbitaloop','moon','Orbit','pad',47000,1170,72,'planet',['#84d7ff','#5e4ea4','#ffdc9b'],'Three tiny moons orbit it, building slow ambient pads.'],
  ['halope','Halope','moon','Halo','glass',53000,1320,76,'halo',['#fff6bd','#85a7e9','#ffffff'],'A floating halo creature with pristine glass harmonics.'],
  ['nebulark','Nebulark','moon','Nebula','bass',60000,1490,82,'jelly',['#b997ff','#344b8d','#f9d8ff'],'A cosmic bass singer whose body ripples like a nebula.'],
  ['tidemoon','Tidemoon','moon','Tide','kalimba',68000,1680,88,'shell',['#75d9e8','#7463bd','#e9faff'],'Plucks moonlit tide-drops into a calm, hypnotic rhythm.'],
  ['astralorganon','Astral Organon','moon','Astral Core','heaven',85000,2400,90,'tower',['#efe4ff','#7862cb','#fff5aa'],'The celestial titan. A radiant organ-choir chord with harp overtones turns the island genuinely heavenly.','Island Titan',true,900,12],

  // Tideglass Reef
  ['kelpkin','Kelpkin','reef','Kelp','pluck',26000,720,50,'kelp',['#58c49a','#237b70','#d8ffca'],'A ribbon-bodied reef plucker that snaps its fronds like soft strings.'],
  ['coraloom','Coraloom','reef','Coral','mallet',30000,810,54,'coral',['#ff9e9b','#b04776','#ffe9a8'],'A branching coral creature whose hollow tips ring like tuned woodblocks.'],
  ['raymora','Raymora','reef','Current','pad',34500,905,58,'ray',['#63d5da','#315f9e','#d7ffff'],'A wide gliding singer that folds the reef into slow, warm chords.'],
  ['urchime','Urchime','reef','Urchin','chime',39000,1005,62,'urchin',['#a678df','#573b9b','#ffe58c'],'Its flexible spines strike one another to make bright glassy chimes.'],
  ['nautibass','Nautibass','reef','Shell','bass',44000,1120,66,'nautilus',['#efb56f','#a64c52','#fff0c9'],'A spiral-shelled bass voice that resonates through its chambered body.'],
  ['seafiddle','Seafiddle','reef','Tide','cello',49500,1245,70,'seahorse',['#79d7bf','#32698e','#ffe9b5'],'A curled-tail bow player with a soft, woody underwater tone.'],
  ['shrimshot','Shrimshot','reef','Snap','snare',55000,1380,74,'shrimp',['#ff987f','#a6425d','#fff1ca'],'Two oversized claws create a tight backbeat with crisp pressure snaps.'],
  ['eellume','Eellume','reef','Lumen','synthlead',61000,1520,78,'eel',['#5ee8d2','#2957a6','#e7ff8e'],'A luminous ribbon-eel that bends notes as its body twists.'],
  ['clamoray','Clamoray','reef','Pearl','celesta',68500,1685,82,'clam',['#e8d4ff','#63519b','#fff7db'],'A pearl-core singer whose shell opens for tiny bell-like phrases.'],
  ['glassfin','Glassfin','reef','Glass','arp',76000,1875,86,'fish',['#79e4ee','#5576c7','#f8ffff'],'Transparent fins flick in sequence, building a quick suspended arpeggio.'],
  ['abyssalchoir','Abyssal Choirspire','reef','Abyss Core','heaven',98000,2750,90,'leviathan',['#58d8c4','#243765','#ffe99b'],'The reef titan. A many-chambered deep-sea giant turns pressure, bubbles, and resonant plates into a huge choir chord.','Island Titan',true,1050,14]
].map(r=>({id:r[0],name:r[1],island:r[2],element:r[3],instrument:r[4],price:r[5],rate:r[6],wait:r[7],shape:r[8],colors:r[9],desc:r[10],featured:r[11]||'',special:!!r[12],notes:r[13]||0,stars:r[14]||0}));

window.MelodicCatalog={VARIANTS,ISLANDS,MONSTERS};
})();
