import './index.scss';

import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

import {
  createRoot,
  useState,
  useEffect,
} from '@wordpress/element';

import {
  Panel,
  PanelBody,
  PanelRow,
  ColorPalette,
  CheckboxControl,
  Spinner,
  Button,
  __experimentalHeading as Heading,
  NoticeList,
} from '@wordpress/components';

const latinate = {
  1: 'primary',
  2: 'secondary',
  3: 'tertiary',
  4: 'quaternary',
  5: 'quinary',
  6: 'senary',
  7: 'septenary',
  8: 'octonary',
  9: 'nonary',
  10: 'denary',
  11: 'undenary',
  12: 'duodenary',
};

const Notices = () => {
  const { removeNotice } = useDispatch( noticesStore );
  const notices = useSelect( ( select ) =>
    select( noticesStore ).getNotices()
  );

  if ( notices.length === 0 ) {
      return null;
  }

  return <NoticeList notices={ notices } onRemove={ removeNotice } />;
};

const OptionsPage = () => {
  const [ loadState, setLoadState ] = useState(false);

  const [ colours, setColours ] = useState([
    '#395786',
    '#a094b1',
  ]);

  const [ supports, setSupports ] = useState({
    defaultPost: false,
    postRewrite: false,
    postCategory: false,
    postTag: false,
    comments: false,
  });

  const { createSuccessNotice } = useDispatch( noticesStore );

  useEffect( () => {
    apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
      setLoadState(true);

      if(settings?.badeggcup?.colours) {
        setColours( settings.badeggcup.colours );
      }

      if(settings?.badeggcup?.supports) {
        setSupports( settings.badeggcup.supports );
      }

    } );
  }, [] );

  const saveSettings = () => {
    apiFetch( {
      path: '/wp/v2/settings',
      method: 'POST',
      data: {
        badeggcup: {
          colours,
          supports,
        }
      },
    }).then( () => {
      createSuccessNotice(
        __( 'Settings saved.', 'badeggcup' )
      );
    });
  };

  return (
    <>
      <Notices />

      <Heading level={ 1 }>
        { __( 'Website Options', 'badeggcup' ) }
      </Heading>

      <Panel>
        { (!loadState) ? <Spinner /> : (
          <>

            {/* <PanelBody title={ __('Brand Colours', 'badeggcup') } className="badeggcup-brand-colours">
              {
                colours.map( (colour) => {
                  let index = colours.indexOf(colour);

                  console.log( index + ' is ' + colour );

                  return (
                    <div key={ index }>
                      <ColorPalette
                        label={ latinate[index + 1] }
                        value={ colour }
                        onChange={ value => {
                          console.log(value);
                        } }
                        defaultValue="#000"
                      />

                    </div>
                  )
                })
              }
            </PanelBody> */}

            <PanelBody title={ __('Theme Support', 'badeggcup') } className="badeggcup-theme-supports">

              <CheckboxControl
                label={ __( 'Default Post Type', 'badeggcup' ) }
                checked={ supports.defaultPost }
                onChange={ ( value => {
                  setSupports({ ...supports, defaultPost: value });

                  if(!value) {
                    setSupports({
                      ...supports,
                      defaultPost: false,
                      postRewrite: false,
                      postCategory: false,
                      postTag: false,
                    });
                  }

                } ) }
                __nextHasNoMarginBottom
              />

              {
                (supports.defaultPost) ? (
                  <>
                    <CheckboxControl
                      label={ __( 'Post Rewrites', 'badeggcup' ) }
                      checked={ supports.postRewrite }
                      onChange={ ( value => setSupports({ ...supports, postRewrite: value }) ) }
                      __nextHasNoMarginBottom
                    />
                    <CheckboxControl
                      label={ __( 'Post Tags', 'badeggcup' ) }
                      checked={ supports.postTag }
                      onChange={ ( value => setSupports({ ...supports, postTag: value }) ) }
                      __nextHasNoMarginBottom
                    />
                    <CheckboxControl
                      label={ __( 'Post Categories', 'badeggcup' ) }
                      checked={ supports.postCategory }
                      onChange={ ( value => setSupports({ ...supports, postCategory: value }) ) }
                      __nextHasNoMarginBottom
                    />
                  </>
                ) : null
              }

              <CheckboxControl
                label={ __( 'Comments', 'badeggcup' ) }
                checked={ supports.comments }
                onChange={ ( value => setSupports({ ...supports, comments: value }) ) }
                __nextHasNoMarginBottom
              />
            </PanelBody>
          </>
        )}
      </Panel>

      <Button variant="primary" onClick={ saveSettings } __next40pxDefaultSize>
        { __( 'Save', 'badeggcup' ) }
      </Button>
    </>
  );
};

domReady( () => {
    const root = createRoot(
        document.getElementById( 'badeggcup-options' )
    );

    root.render( <OptionsPage /> );
} );
