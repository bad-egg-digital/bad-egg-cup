import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
  useState,
  useEffect,
} from '@wordpress/element';

import {
  PanelBody,
  Flex,
  FlexItem,
  CheckboxControl,
  Spinner,
} from '@wordpress/components';

export default function SectionSupports({ supports, setSupports })
{
  const [ loadedSupports, setLoadedSupports ] = useState(false);

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      if(settings?.badeggcup?.supports) {
        setLoadedSupports(true);
        setSupports( settings.badeggcup.supports );
      }
    } );
  }, [] );


}
