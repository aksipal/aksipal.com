/**
 * Google İşletme Profili (Places API New) yorumlarını sunucu tarafında çeker.
 *
 * - Anahtar yalnızca env'den okunur (GOOGLE_PLACES_API_KEY) — istemciye sızmaz.
 * - ISR ile 7 günde bir tazelenir (revalidate); kota kullanımı minimumda kalır.
 * - Yalnızca 5 yıldızlı yorumlar, en yeniden eskiye sıralı, ilk 5 tanesi gösterilir.
 * - API erişilemezse aşağıdaki gerçek yorumlar statik yedek olarak kullanılır.
 */

export type GoogleReview = {
  author: string;
  photo?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  authorUri?: string;
};

export type ReviewsData = {
  rating: number;
  total: number;
  mapsUri?: string;
  reviews: GoogleReview[];
};

const PLACE_ID = process.env.GOOGLE_PLACES_PLACE_ID ?? "ChIJIVsX7jdP0xQR2rslnfyknyc";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const MAPS_URI = "https://www.google.com/maps/place/?q=place_id:ChIJIVsX7jdP0xQR2rslnfyknyc";

/** API erişilemediğinde gösterilen, profilden alınmış gerçek 5 yıldız yorumlar (en yeniden eskiye). */
const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    author: "renk Lojistik",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocJx4ZznkA9WskdVQcuw5_h60UwNtfa2-VA_Jtd-KX9cj1iRgQ=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Firmamız için web sitesi kurulum hizmeti aldık başta konuştuklarımızın üstüne eklemeler yaptık Barış Bey bizi kırmadı tavsiye ederim.",
    relativeTime: "2 ay önce",
    publishTime: "2026-04-07T13:39:31Z",
    authorUri: "https://www.google.com/maps/contrib/113529161340217594264/reviews",
  },
  {
    author: "Ozan KOÇ",
    photo:
      "https://lh3.googleusercontent.com/a-/ALV-UjW9eEGmzfpGQocZoq_QWnwEPL5cjmJDpPrl66BZYBXN03e6SZwE=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Web sitesi yapmaktan anlamıyordum, bu yüzden kandırılma çekincem vardı. Ama Barış Bey sağ olsun önce neler yapacağını anlattı, sonraki süreçte de hep diyalog hâlinde kaldı. İki kez iş yapma fırsatımız oldu, ikisinde de memnun kaldım. Web sitesi yaptıracaklara tavsiye ederim.",
    relativeTime: "bir yıl önce",
    publishTime: "2024-09-19T08:41:28Z",
    authorUri: "https://www.google.com/maps/contrib/113589679175831849721/reviews",
  },
  {
    author: "Umut Çelik",
    photo:
      "https://lh3.googleusercontent.com/a-/ALV-UjXc4FxUc86KDja0hRd268lmfr_YQjuh6WMiC262y3w-TFvaPhfj=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Spor salonumuz için web sitesi gerekiyordu, Barış Bey'i bulduk; çok uygun fiyata çok profesyonel bir web sitesi hazırladı, çok memnun kaldık. Tekrar bir işimiz olursa kesinlikle Barış Bey'i tercih edeceğiz, kendisine teşekkür ederim.",
    relativeTime: "bir yıl önce",
    publishTime: "2024-09-19T08:11:34Z",
    authorUri: "https://www.google.com/maps/contrib/101947279871185458812/reviews",
  },
  {
    author: "Mehmet Sefa Bilgiç",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocIEd_DSxk8Y3MdL65jt0nqjmn0J-gEsA0A1DuW4P69SYidxvg=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Web sitemiz için detaylı bir değişiklik yaptırmak istedik; gayet hızlı ve çözüm odaklı yaklaşarak işi kısa sürede bitirdiler. Tavsiye ederim.",
    relativeTime: "bir yıl önce",
    publishTime: "2024-09-19T07:41:28Z",
    authorUri: "https://www.google.com/maps/contrib/101847058694378311680/reviews",
  },
  {
    author: "Taylan Şahin",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocLsek2KfQKHeq0fInq8GiLVEFlhBAmW9b-8G7_lmd2FuAoNphM=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Kendime özel bir web sitesi yapmak istiyordum, bu sebeple Barış Bey'e ulaştım. İsteklerimi dikkatle dinleyerek yerine getirdi ve bunu çok kısa sürede gerçekleştirdi. Sizin de böyle bir düşünceniz olursa Barış Bey'den hiç çekinceniz olmasın.",
    relativeTime: "bir yıl önce",
    publishTime: "2024-09-19T07:26:20Z",
    authorUri: "https://www.google.com/maps/contrib/101748638495350327886/reviews",
  },
];

const FALLBACK: ReviewsData = {
  rating: 5,
  total: 14,
  mapsUri: MAPS_URI,
  reviews: FALLBACK_REVIEWS,
};

type RawReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  publishTime?: string;
  relativePublishTimeDescription?: string;
};

export async function getGoogleReviews(locale: "tr" | "en"): Promise<ReviewsData> {
  if (!API_KEY) {
    return FALLBACK;
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=${locale}`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews.rating,reviews.text,reviews.originalText,reviews.authorAttribution,reviews.publishTime,reviews.relativePublishTimeDescription",
        },
        // ISR: 7 günde bir tazelenir (kota dostu)
        next: { revalidate: 604800 },
      },
    );

    if (!res.ok) {
      return FALLBACK;
    }

    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: RawReview[];
    };

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .filter((r) => r.rating === 5)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google kullanıcısı",
        photo: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        text: r.text?.text ?? r.originalText?.text ?? "",
        relativeTime: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
        authorUri: r.authorAttribution?.uri,
      }))
      .filter((r) => r.text.length > 0)
      .sort((a, b) => (a.publishTime < b.publishTime ? 1 : -1))
      .slice(0, 5);

    if (reviews.length === 0) {
      return FALLBACK;
    }

    return {
      rating: data.rating ?? 5,
      total: data.userRatingCount ?? reviews.length,
      mapsUri: data.googleMapsUri ?? MAPS_URI,
      reviews,
    };
  } catch {
    return FALLBACK;
  }
}
