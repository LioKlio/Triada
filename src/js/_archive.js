const body = document.querySelector('body');
const bookingForm = document.querySelector('.booking-form');

const removeActive = (list, actClass) => list.forEach(el => el.classList.remove(actClass));
const setActive = (list, actClass, indx) =>
  list.forEach(el => el.classList.add(el.dataset.index == indx ? actClass : 'col'));

function offset(el) {
  const rect = el.getBoundingClientRect();
  const elLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const elTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + elTop, left: rect.left + elLeft };
}

AOS.init({
  once: true,
  easing: 'ease',
  duration: 1500,
  anchorPlacement: 'top-bottom'
});

document.querySelectorAll('.btn__booking').forEach(el => {
  el.addEventListener('click', ev => {
    ev.preventDefault();

    const btnOffset = offset(el);

    bookingForm.style.top = `${btnOffset.top + el.offsetHeight}px`;
    bookingForm.style.right = `${body.clientWidth - btnOffset.left - el.offsetWidth}px`;

    if (el.classList.contains('show') === true) {
      el.classList.remove('show');
      bookingForm.classList.remove('open');
    } else {
      el.classList.add('show');
      bookingForm.classList.add('open');
    }
  });
});

const menuTrigger = document.querySelector('.menu-trigger');
menuTrigger.addEventListener('click', ev => {
  ev.preventDefault();
  const navLeft = menuTrigger.closest('nav');
  navLeft.classList.contains('is-active') === true
    ? navLeft.classList.remove('is-active')
    : navLeft.classList.add('is-active');
});

document.querySelectorAll('.nav__main .hasChild').forEach(el => {
  el.addEventListener('click', ev => {
    ev.preventDefault();
    if (el.classList.contains('current') === true) el.classList.remove('current');
    else {
      const cur = document.querySelector('.nav__main .current');
      if (cur) cur.classList.remove('current');
      el.classList.add('current');
    }
  });
});

// Datepicker
flatpickr('#daterange', {
  dateFormat: 'd-m-Y',
  mode: 'range',
  minDate: 'today'
});

// custom SELECT
class CustomSelect {
  constructor(selector) {
    this.selector = selector;
    this.element = null;
    this.init();
  }

  init() {
    // this.element = document.querySelector(this.selector);
    this.element = this.selector;
    this.options = [...this.element.options].map(option => ({
      label: option.textContent,
      value: option.getAttribute('value') || option.textContent
    }));
    this.placeholder = this.element.getAttribute('placeholder');
    this.selectedIndex = this.element.selectedIndex;
    this.createSelect();
    this.initHandlers();
    this.insertToDOM();
  }

  createSelect() {
    this.root = document.createElement('div');
    this.root.classList.add('csmSelect');
    this.root.setAttribute('tabindex', 1);
    this.root.insertAdjacentHTML(
      'afterbegin',
      `
     <div class="csmSelect__label form-control">${this.options[this.selectedIndex].label}</div>
     <div class="csmSelect__arrow"></div>
     <ul class="csmSelect__options">
     		${this.options
          .map(option => `<li class="csmSelect__option" data-value="${option.value}">${option.label}</li>`)
          .join('')}
     </ul>
    `
    );
  }

  initHandlers() {
    this.root.addEventListener('focus', e => {
      e.currentTarget.classList.add('open');
    });

    this.root.addEventListener('blur', e => {
      e.currentTarget.classList.remove('open');
    });

    this.root.addEventListener('click', e => {
      if (e.target.classList.contains('csmSelect__option')) {
        const value = e.target.textContent;
        e.currentTarget.querySelector('.csmSelect__label').textContent = value;
        const index = this.options.findIndex(option => option.label === value);
        this.element.selectedIndex = index;
        e.currentTarget.blur();
      }
    });
  }

  insertToDOM() {
    this.element.insertAdjacentElement('afterend', this.root);
    this.root.insertAdjacentElement('afterbegin', this.element);
  }
}
document.querySelectorAll('.select').forEach(el => new CustomSelect(el));

document.querySelectorAll('.btn__submit').forEach(el => {
  el.addEventListener('click', ev => {
    ev.preventDefault();

    const form = el.closest('form');
    const data = new FormData(form);

    // lio: it for only event data preview

    for (const pair of data.entries()) {
      console.log(`${pair[0]} :  ${pair[1] !== '' ? pair[1] : '[empty]'}`);
    }

    // TODO: custom select reset
    form.reset();
  });
});

// Carousels
const topCarousel = new Swiper('.top .swiper-container', {
  autoplay: { delay: 10000 },
  loop: true,
  pagination: {
    el: '.top .swiper-pagination .container',
    clickable: true
  }
});

const quatroCarousel = new Swiper('.quatro .swiper-container', {
  slidesPerView: 4,
  autoplay: { delay: 6000 },
  loop: true,
  navigation: {
    nextEl: '.quatro .swiper-button-next',
    prevEl: '.quatro .swiper-button-prev',
    clickable: true
  },
  breakpoints: {
    300: { slidesPerView: 1 },
    500: { slidesPerView: 2 },
    800: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
    1440: { slidesPerView: 5 }
  }
});

const lst = document.querySelectorAll('.rooms .title-pagination li');
const roomCarousel = new Swiper('.rooms .swiper-container', {
  // autoplay: { delay: 10000 },
  loop: true,
  navigation: {
    nextEl: '.rooms .swiper-button-next',
    prevEl: '.rooms .swiper-button-prev',
    clickable: true
  },
  on: {
    init() {
      lst.forEach((el, inx) =>
        el.addEventListener('click', ev => {
          e.preventDefault();

          roomCarousel.slideTo(inx + 1, 500);
          if (el.dataset.inx == inx + 1) {
            removeActive(lst, 'active');
            el.classList.add('active');
          }
        })
      );
    },
    slideChangeTransitionEnd() {
      removeActive(lst, 'active');
      setActive(lst, 'active', this.activeIndex);
    }
  }
});



// googlemap
const ngMarkers = {
  'shopping': [
    [32.0770575, -81.0920333],
    [32.0729377, -81.0981505],
    [32.0776352, -81.0846709]
  ],
  'dining': [
    [32.0788098, -81.0924761],
    [32.0735377, -81.0954357],
    [32.0757215, -81.0901651]
  ],
  'parks': [
    [32.069502,  -81.0961193],
    [32.0800681, -81.086601],
    [32.0750351,-81.0907493]
  ],
  'entertainment': [
    [32.0721961, -81.0924641],
    [32.072456,  -81.0937283],
    [32.0757215, -81.0901651]
  ],
  'spa': [
    [32.0768374, -81.0940754],
    [32.0713768, -81.1015038],
    [32.0673705, -81.0968464],
    [32.0610265, -81.1143542],
    [32.0489872, -81.0973598]
  ],
};

let options;
let image;
let map;
let marker;
let markers=[];
document.querySelectorAll('.mappoint').forEach(el => {
  el.addEventListener('click', ev => {
    removeActive(document.querySelectorAll('.mappoint'), 'current');
    ev.currentTarget.classList.add('current');
    setGpoints(el.dataset.point);
  });
});

// let offsetCenter = (latlng, offsetx, offsety) => {

//   console.log(latlng.lat(), latlng.lng(), map.getZoom());

//   const scale = Math.pow(2, map.getZoom());
//   const worldCoordinateCenter = map
//     .getProjection()
//     .fromLatLngToPoint(latlng);

//   const pixelOffset = new google.maps.Point(
//     50000 / scale || 0,
//     offsety / scale || 0
//   );
//   console.log(worldCoordinateCenter, pixelOffset)

//   const worldCoordinateNewCenter = new google.maps.Point(
//     worldCoordinateCenter.x - pixelOffset.x,
//     worldCoordinateCenter.y + pixelOffset.y
//   );

//   const newCenter = map
//     .getProjection()
//     .fromPointToLatLng(worldCoordinateNewCenter);

//   console.log(newCenter.lat(), newCenter.lng());

//   map.setCenter({lat:newCenter.lat(), lng:newCenter.lng()});
//   map.setCenter(newCenter);
//   console.log(map.getCenter().lat(), map.getCenter().lng());

// };

let setGpoints = type => {
  let bounds = new google.maps.LatLngBounds();
  markers.forEach(marker => marker.setMap(null));
  markers=[];

  image.url = `./img/gmap/point_${type}.svg`;

  ngMarkers[type].forEach(markerLoc => {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(markerLoc[0], markerLoc[1]),
      map: map,
      animation: 'bounce',
      icon: image
    });
    bounds.extend(marker.position);
    markers.push(marker);
  });
  map.fitBounds(bounds);

  // map.setCenter({lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng()});
  // google.maps.event.addListenerOnce(map, "projection_changed", function() {
  //   offsetCenter(map.getCenter(), 0, 0)
  // });
};


const styleMap = [
  {
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "hue": "#0066ff"
          },
          {
              "saturation": 74
          },
          {
              "lightness": 100
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "weight": 0.6
          },
          {
              "saturation": -85
          },
          {
              "lightness": 61
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#5f94ff"
          },
          {
              "lightness": 26
          },
          {
              "gamma": 5.86
          }
      ]
  }
];

function initialize() {
  options = {
    styles: styleMap,
    center: new google.maps.LatLng(32.0772338, -81.0933586),
    zoom: 15,
    scrollwheel: false
  };
  map = new google.maps.Map(document.getElementById('gmap'), options);
  image = {
    size: new google.maps.Size(54, 54),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(26, 54)
  };
  document.querySelector('.mappoint[data-point="dining"]').classList.add('current');
  setGpoints('dining');
}
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, 'resize', initialize);

