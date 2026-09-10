/**
 * Placeholder imagery taken from the Stitch design. These are AI generated
 * images, used temporarily at the client's request until real photos and
 * video are supplied.
 *
 * Before launch, note that some placeholders show third party branding
 * (corporateWellnessEvent: Discovery and VUMA; clinicScreening: Medcor) and
 * certificate plaques (homeHero: HPCSA, SABS). Replace them before going live.
 *
 * To replace an image: overwrite the file in src/assets/placeholders/ (or
 * point the import at a new file), update its alt text, and set
 * `placeholder: false`. Keep the export names so pages do not need changing.
 *
 * Alt text describes what is visible and never presents a placeholder as a
 * real Mintirho facility, event or staff member.
 */
import clinicLab from '../assets/placeholders/clinic-lab.jpg';
import corporateWellnessEvent from '../assets/placeholders/corporate-wellness-event.jpg';
import clinicScreening from '../assets/placeholders/clinic-screening.jpg';
import wellnessDay from '../assets/placeholders/wellness-day-smoothie-bike.jpg';
// Real frame from Mintirho's own Smoothie Bike video (not a placeholder).
import videoPoster from '../assets/photos/smoothie-bike-video-frame.jpg';
// Supplied by the client for the On Site Clinic Management page.
import mobileClinicTrailer from '../assets/photos/mintirho-mobile-clinic-trailer.jpg';

export interface MediaImage {
  src: ImageMetadata;
  alt: string;
  placeholder: boolean;
}

export const media = {
  homeHero: {
    src: clinicLab,
    alt: 'A nurse in navy scrubs working at a computer in a clinic laboratory',
    placeholder: true,
  },
  smoothieHero: {
    src: corporateWellnessEvent,
    alt: 'Colleagues holding green smoothies and laughing as a woman pedals a smoothie bike at an outdoor wellness event',
    placeholder: true,
  },
  clinicScreening: {
    src: clinicScreening,
    alt: 'A nurse fitting vision testing equipment on a smiling worker in an occupational health consultation room',
    placeholder: true,
  },
  smoothieFeature: {
    src: wellnessDay,
    alt: 'Colleagues cheering as a woman pedals a smoothie bike at an outdoor wellness day',
    placeholder: true,
  },
  smoothieVideoPoster: {
    src: videoPoster,
    alt: 'Three men laughing as they pedal Mintirho smoothie bikes at a workplace event',
    placeholder: false,
  },
  onSiteClinic: {
    src: mobileClinicTrailer,
    alt: 'The Mintirho occupational health trailer, branded with the Mintirho logo and a list of occupational health services',
    placeholder: false,
  },
} satisfies Record<string, MediaImage>;

/**
 * Smoothie Bike video. Stitch only contained a still image, so no video is set
 * yet. To add one, place the files in public/video/ and set, for example:
 *   src: '/video/smoothie-bike.mp4', type: 'video/mp4',
 *   captions: '/video/smoothie-bike.vtt'
 * Provide a WebVTT captions file with any video that has speech (accessibility).
 * The Smoothie Bike page then plays it inline with the poster above.
 */
export const smoothieVideo: { src?: string; type?: string; captions?: string; title: string } = {
  // Supplied by Mintirho. The audio track was removed at the client's request.
  src: '/video/smoothie-bike.mp4',
  type: 'video/mp4',
  title: 'The Mintirho Smoothie Bike in action',
};
