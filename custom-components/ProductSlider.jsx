import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Area from '@components/common/Area';
import { Name } from './item/Name';
import { Price } from './item/Price';
import { Thumbnail } from './item/Thumbnail';
import PropTypes from 'prop-types';
import { get } from '../../../../../lib/util/get.js';
import { _ } from '../../../../../lib/locale/translate/index.js';

export default function ProductSlider({ products = [], countPerRow = 3 }) {
  if (!products.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {_('There is no product to display')}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-lg p-4">
      <Swiper
        className="rounded-xl"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={countPerRow}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: countPerRow }
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.productId} className="p-2">
            <Area
              id="productListingItem"
              className="listing-item bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              product={p}
              coreComponents={[
                {
                  component: { default: Thumbnail },
                  props: {
                    url: p.url,
                    imageUrl: get(p, 'image.url') || get(p, 'image.listing'),
                    alt: p.image?.alt || p.name || 'Product image'
                  },
                  sortOrder: 10,
                  id: 'thumbnail'
                },
                {
                  component: { default: Name },
                  props: { name: p.name, url: p.url, id: p.productId },
                  sortOrder: 20,
                  id: 'name'
                },
                {
                  component: { default: Price },
                  props: { ...p.price },
                  sortOrder: 30,
                  id: 'price'
                }
              ]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

ProductSlider.propTypes = {
  products: PropTypes.array.isRequired,
  countPerRow: PropTypes.number
};

