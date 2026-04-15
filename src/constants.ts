import { Workout } from './types';

export const WORKOUTS: Workout[] = [
  {
    id: '1',
    title: 'Coastal Endurance',
    type: 'Outdoor Run',
    duration: '6.2 mi',
    intensity: 'High',
    category: 'Cardio',
    tag: 'IDEAL CONDITIONS',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw_YKpS7NaXQNnUdm3YdGGsmVN7r5ZAPRwPSDfyOo-ImfHcafW6bCAHtnA1dgxC7bBnF-TQo2F7gcpdGA4-88VeYkxTkS7mr9PcGJtsXtnTnAU5LZee6JNAm-Q49ZmlxiZ6_y9h0-PdcLu2pIPDr85rAH-DWhfXWK8wl7tNlhUiFAXU1SjMJjcXyqjRojXZPn0Fd8ZfqAT8j31xEGCW9sdSjTnKiI5B4d2bQ_-s7yQtbW6MQ_7H8q-U5LSnSAcTt-6BVnY1G3wbEc',
    description: 'Cool breeze and dry air make this perfect for a high-intensity cardio block.'
  },
  {
    id: '2',
    title: 'Metabolic Burn',
    type: 'Indoor HIIT',
    duration: '45 min',
    intensity: 'High',
    category: 'HIIT',
    tag: 'INDOOR ALTERNATIVE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHwZiIz2dQXCAto9IfzsY4XUffOc01N7d59BsSoFE940z3WbUxJDLUSXkrHJWspLUT2GuFnsd2RLbo6u_MJy-jt81jF9n52uHgdTdorMn-k5uQytr-cY00SQUXHFdB5W_cXYy0vn_ZPQEu9OLJdwKizrcecaf6obCYw3KCKUVCoKmOpPFHcGmVGRv-WQYRMZvTjbqQBGXMRtOh2ocX0ydeZ9U11y43tZg_K9bNt2gT0q6otEdG7Q_MyJpwiDMJSawPWD6Mfd_n810',
    description: 'Simulate elevation training in the studio. Avoid the rising humidity.'
  },
  {
    id: '3',
    title: 'Vinyasa Flow',
    type: 'Recovery',
    duration: '30 min',
    intensity: 'Low',
    category: 'Yoga',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWexsSjnOt2G_lm_S52IK5VocNN9b4WvsEeYmNQ_ZtVaaCOWSf1aKcWTon8FFiyeH6bB-hc59IlK4nfgvZHoL8ynTcP86x1aiNBYymfQLhrxQ6dIHBkLtSpLsHv3hNbPVNBhlkX-Tr9t5IAIJCa6iEjib2D2lalGJYQsCEPp9FuV45gQe5LkskJs0p6e-91U1iKnmvRKJzaQ3reRnM5TEJGQY5GPZvbN4i4emuWwaAlqVK71owcHW732L6OcZOBfiZPkvsxRTVRG4',
    description: 'Gentle mobility focus to align with the evening\'s calming atmosphere.'
  },
  {
    id: '4',
    title: 'Total Body Power Flow',
    type: 'Strength Training',
    duration: '15 min',
    intensity: 'Medium',
    category: 'Strength',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUxqVGXLaXdwDsar75LiNL2eBdRqqICMXhNYmkykVBLZmUGUdOQPpuPI8emMjhiDtst6OgFOmIKRTmzH8QUjkRdN6v-UxIhT4WfxF_pGSbHL89rGbDiuCP0BY_PXChcxGGhPMJOM3Q65WW-OpQe1TQfX1gXmmZjgQ59c0P__G2BwA_Jc7u6gM19TtoSvAOCCJpu4ZLRSV0WkcQvJPskNibKycsdqhrsHQogWVqw4ttstlWzCmx8RqPlNRUmN8rfYRMgn_YJgcQc4I',
    description: 'Sculpt and tone using dynamic movements and high-intensity sets.'
  },
  {
    id: '5',
    title: 'Electric Burn Interval',
    type: 'HIIT',
    duration: '20 min',
    intensity: 'High',
    category: 'HIIT',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfMpD-cuEIqIfCY88S1IYze2vQXlmuYwJfu2Rpl4hQ8N25sf2h_-Cw4SsqbHzlj7Edyap5i_ig-q2b3PsH7P0S1v_B4EEGbzVjUu-MiQLq9nS4idz2dBdkSfnetKLG4iNKccXIdTQsGyt1LPpljSfQPToRNZlp2O3Cswz9ReG0iBLZGNwePFGIRLW12gxPPplxx-zZpPku_uTilFf_nPj95u78PBRl597V4XAvxlorsklrXTjMg4nwMD8-C98z2MCc3P89bBPl4hA',
    description: 'High-energy cardio session designed to maximize calorie burn in 20 minutes.'
  },
  {
    id: '6',
    title: 'Mobility & Restoration',
    type: 'Beginner Recovery',
    duration: '25 min',
    intensity: 'Low',
    category: 'Yoga',
    tag: 'NEW',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoZHUdw_qoQ7gV0TJuywHZHeaZfaLtt90UG3PsrGXs6Q0GQR7SCi-HeWvSSQJviNU8NxwQ2ypDFgMQlUD8PjJ5kirKoR1pyq_MSl8S4BlZ1vWP9AP3W0Au8O2wSTYF2QB7niREhPbBGByt8Hg4uZ_HY_SVGCYjledEdW3yqqvvN-m_K3xeVDppNa206JL3Kn3tnXFnOWclGkTMen0WYXYVRyAIFzEbba7duTvGyndE6YU3TgS6M59CTzR97fyfMZyhcA9tvRCHWGI',
    description: 'A gentle recovery session focused on joint health and mental clarity to prep you for tomorrow\'s grind.'
  },
  {
    id: '7',
    title: 'Upper Body Power',
    type: 'Strength',
    duration: '40 min',
    intensity: 'High',
    category: 'Strength',
    image: 'https://picsum.photos/seed/strength1/800/600',
    description: 'Focus on chest, back, and shoulders with heavy compound movements.'
  },
  {
    id: '8',
    title: 'Sunrise Run',
    type: 'Cardio',
    duration: '5 mi',
    intensity: 'Medium',
    category: 'Cardio',
    image: 'https://picsum.photos/seed/run1/800/600',
    description: 'A steady-state run to start your day with energy and clarity.'
  },
  {
    id: '9',
    title: 'Tabata Torch',
    type: 'HIIT',
    duration: '20 min',
    intensity: 'High',
    category: 'HIIT',
    image: 'https://picsum.photos/seed/hiit1/800/600',
    description: '20 seconds on, 10 seconds off. Maximum effort for maximum results.'
  },
  {
    id: '10',
    title: 'Evening Zen',
    type: 'Yoga',
    duration: '45 min',
    intensity: 'Low',
    category: 'Yoga',
    image: 'https://picsum.photos/seed/yoga1/800/600',
    description: 'Deep stretching and meditation to unwind after a long day.'
  },
  {
    id: '11',
    title: 'Lower Body Sculpt',
    type: 'Strength',
    duration: '35 min',
    intensity: 'Medium',
    category: 'Strength',
    image: 'https://picsum.photos/seed/strength2/800/600',
    description: 'Target your glutes, quads, and hamstrings for a powerful lower body.'
  },
  {
    id: '12',
    title: 'Core Crusher',
    type: 'HIIT',
    duration: '15 min',
    intensity: 'High',
    category: 'HIIT',
    image: 'https://picsum.photos/seed/core1/800/600',
    description: 'Intense abdominal work to build a rock-solid core.'
  }
];
