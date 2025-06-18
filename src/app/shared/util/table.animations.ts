import {
  trigger,
  sequence,
  animate,
  transition,
  style,
  // query,
  // stagger,
} from '@angular/animations';

export const rowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    style({
      height: '*',
      opacity: '0',
      transform: 'translateY(-50px)',
      'box-shadow': 'none',
    }),
    sequence([
      animate(
        '.30s ease',
        style({
          height: '*',
          opacity: '.2',
          transform: 'translateY(0)',
          'box-shadow': 'none',
        })
      ),
      animate(
        '.30s ease',
        style({ height: '*', opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
  ]),
]);

// export const rowsAnimation = trigger('rowsAnimation', [
//   // Transition for when a row is added
//   transition('void => *', [
//     style({
//       height: '*',
//       opacity: '0',
//       transform: 'translateY(-50px)',
//       'box-shadow': 'none',
//     }),
//     sequence([
//       animate(
//         '.30s ease',
//         style({
//           height: '*',
//           opacity: '.2',
//           transform: 'translateY(0)',
//           'box-shadow': 'none',
//         })
//       ),
//       animate(
//         '.30s ease',
//         style({ height: '*', opacity: 1, transform: 'translateY(0)' })
//       ),
//     ]),
//   ]),
//   // Transition for when a row is removed
//   transition('* => void', [
//     animate('.2s', style({ opacity: '0' })),
//     animate('.2s ease', style({ height: 0 })),
//   ]),
//   // Transition for when any key is pressed
//   transition('* => *', [
//     style({
//       height: '*',
//       opacity: '.2',
//       transform: 'translateY(0)',
//       'box-shadow': 'none',
//     }),
//     sequence([
//       animate(
//         '.30s ease',
//         style({ height: '*', opacity: 1, transform: 'translateY(0)' })
//       ),
//     ]),
//   ]),
// ]);
