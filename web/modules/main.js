import * as viewer from './pdt360DegViewer.js';

var path = './img/';

//pdt360DegViewer(imgDivid, count, path, imgType, playable, autoPlay, drag, mouseMove, buttonNavigation, keyNavigation, scroll);

viewer.pdt360DegViewer('car0', 59, path, 'jpg', true, true, false, false, false, false, false);    //playable autoPlay
viewer.pdt360DegViewer('car1', 59, path, 'jpg', true, false, false, false, false, false, false);   //playable
viewer.pdt360DegViewer('car2', 59, path, 'jpg', false, true, false, false, false, false, false);   //autoPlay
viewer.pdt360DegViewer('car3', 59, path, 'jpg', false, false, true, false, false, false, false);   //draggable
viewer.pdt360DegViewer('car4', 59, path, 'jpg', false, false, false, true, false, false, false);   //mouseMove
viewer.pdt360DegViewer('car5', 59, path, 'jpg', false, false, false, false, true, false, false);   //buttonNavigation
viewer.pdt360DegViewer('car6', 59, path, 'jpg', false, false, false, false, false, true, false);   //keys
viewer.pdt360DegViewer('car7', 59, path, 'jpg', false, false, false, false, false, false, true);   //scroll