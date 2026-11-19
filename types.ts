/** One row of demos.xlsx. */
export interface Demo {
  id: string;
  title: string;
  description: string;
  /** Drive the navigation filters. The first tag is shown as the badge on the card. */
  tags: string[];
  /** Shown as #hashtags on the card and used by the search box. */
  keywords: string[];
  /** Empty when the sheet has no (valid) link yet. */
  url: string;
  /** Empty when the sheet has no (valid) image link: the default picture is used. */
  imageUrl: string;
  featured: boolean;
}
