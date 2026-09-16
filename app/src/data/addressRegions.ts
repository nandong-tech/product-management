/**
 * Demo subset of ISO 3166-1 countries + ISO 3166-2 subdivisions.
 * Production would load the full ISO lists.
 */
export type CountryOption = {
  code: string;
  name: string;
  subdivisions: { code: string; name: string }[];
};

export const COUNTRIES: CountryOption[] = [
  {
    code: 'PH',
    name: 'Philippines',
    subdivisions: [
      { code: 'PH-00', name: 'Metro Manila' },
      { code: 'PH-BTG', name: 'Batangas' },
      { code: 'PH-CEB', name: 'Cebu' },
      { code: 'PH-DAV', name: 'Davao del Sur' },
      { code: 'PH-LAG', name: 'Laguna' },
      { code: 'PH-PAN', name: 'Pangasinan' },
      { code: 'PH-RIZ', name: 'Rizal' },
    ],
  },
  {
    code: 'US',
    name: 'United States of America',
    subdivisions: [
      { code: 'US-CA', name: 'California' },
      { code: 'US-FL', name: 'Florida' },
      { code: 'US-NY', name: 'New York' },
      { code: 'US-TX', name: 'Texas' },
      { code: 'US-WA', name: 'Washington' },
    ],
  },
  {
    code: 'CA',
    name: 'Canada',
    subdivisions: [
      { code: 'CA-AB', name: 'Alberta' },
      { code: 'CA-BC', name: 'British Columbia' },
      { code: 'CA-ON', name: 'Ontario' },
      { code: 'CA-QC', name: 'Quebec' },
    ],
  },
  {
    code: 'GB',
    name: 'United Kingdom of Great Britain and Northern Ireland',
    subdivisions: [
      { code: 'GB-ENG', name: 'England' },
      { code: 'GB-SCT', name: 'Scotland' },
      { code: 'GB-WLS', name: 'Wales' },
      { code: 'GB-NIR', name: 'Northern Ireland' },
    ],
  },
  {
    code: 'AU',
    name: 'Australia',
    subdivisions: [
      { code: 'AU-NSW', name: 'New South Wales' },
      { code: 'AU-QLD', name: 'Queensland' },
      { code: 'AU-VIC', name: 'Victoria' },
      { code: 'AU-WA', name: 'Western Australia' },
    ],
  },
  {
    code: 'SG',
    name: 'Singapore',
    subdivisions: [{ code: 'SG-01', name: 'Singapore' }],
  },
  {
    code: 'JP',
    name: 'Japan',
    subdivisions: [
      { code: 'JP-13', name: 'Tokyo' },
      { code: 'JP-27', name: 'Osaka' },
      { code: 'JP-14', name: 'Kanagawa' },
    ],
  },
  {
    code: 'IN',
    name: 'India',
    subdivisions: [
      { code: 'IN-DL', name: 'Delhi' },
      { code: 'IN-MH', name: 'Maharashtra' },
      { code: 'IN-KA', name: 'Karnataka' },
    ],
  },
  { code: 'DE', name: 'Germany', subdivisions: [
    { code: 'DE-BE', name: 'Berlin' },
    { code: 'DE-BY', name: 'Bavaria' },
    { code: 'DE-HH', name: 'Hamburg' },
  ]},
  { code: 'FR', name: 'France', subdivisions: [
    { code: 'FR-IDF', name: 'Île-de-France' },
    { code: 'FR-ARA', name: 'Auvergne-Rhône-Alpes' },
  ]},
  { code: 'BR', name: 'Brazil', subdivisions: [
    { code: 'BR-SP', name: 'São Paulo' },
    { code: 'BR-RJ', name: 'Rio de Janeiro' },
  ]},
  { code: 'MX', name: 'Mexico', subdivisions: [
    { code: 'MX-CMX', name: 'Ciudad de México' },
    { code: 'MX-JAL', name: 'Jalisco' },
  ]},
  { code: 'AE', name: 'United Arab Emirates', subdivisions: [
    { code: 'AE-DU', name: 'Dubai' },
    { code: 'AE-AZ', name: 'Abu Dhabi' },
  ]},
  { code: 'NZ', name: 'New Zealand', subdivisions: [
    { code: 'NZ-AUK', name: 'Auckland' },
    { code: 'NZ-WGN', name: 'Wellington' },
  ]},
  { code: 'KR', name: 'Korea, Republic of', subdivisions: [
    { code: 'KR-11', name: 'Seoul' },
    { code: 'KR-26', name: 'Busan' },
  ]},
].sort((a, b) => a.name.localeCompare(b.name));

export function getCountry(code: string) {
  return COUNTRIES.find((c) => c.code === code);
}
