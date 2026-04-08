import { __ } from '@wordpress/i18n';

import {
  CardDivider,
  CheckboxControl,
  __experimentalHeading as Heading,
} from '@wordpress/components';


export default function CardSupports({ supports, setSupports })
{
  return (
    <>
      <CheckboxControl
        label={ __( 'Brand Colours', 'badeggcup' ) }
        checked={ supports.colours }
        onChange={ ( value => setSupports({ ...supports, colours: value }) ) }
        __nextHasNoMarginBottom
      />

      <CheckboxControl
        label={ __( 'Social Channels', 'badeggcup' ) }
        checked={ supports.companySocials }
        onChange={ ( value => setSupports({ ...supports, companySocials: value }) )}
        __nextHasNoMarginBottom
      />

      <CheckboxControl
        label={ __( 'Company Info', 'badeggcup' ) }
        checked={ supports.company }
        onChange={ ( value => {
          setSupports({ ...supports, company: value });

          if(!value) {
            setSupports({
              ...supports,
              company: false,
              companyAddress: false,
              companyAddressMailing: false,
            });
          }

        } ) }
        __nextHasNoMarginBottom
      />

      {
        (supports.company) ? (
          <>
            <CheckboxControl
              label={ __( 'Address', 'badeggcup' ) }
              checked={ supports.companyAddress }
              onChange={ ( value => {
                setSupports({ ...supports, companyAddress: value });

                if(!value) {
                  setSupports({
                    ...supports,
                    companyAddress: false,
                    companyAddressMailing: false,
                  });
                }

              } ) }
              __nextHasNoMarginBottom
            />

            {
              (supports.companyAddress) ? (
                <CheckboxControl
                  label={ __( 'Mailing Address', 'badeggcup' ) }
                  checked={ supports.companyAddressMailing }
                  onChange={ ( value => setSupports({ ...supports, companyAddressMailing: value }) ) }
                  __nextHasNoMarginBottom
                />
              ) : null
            }
          </>
        ) : null
      }

      <CheckboxControl
        label={ __( 'Third-party Integrations', 'badeggcup' ) }
        checked={ supports.integrations }
        onChange={ ( value => {
          setSupports({ ...supports, integrations: value });

          if(!value) {
            setSupports({
              ...supports,
              integrations: false,
              integrationsFathom: false,
              integrationsPlausible: false,
            });
          }

        } ) }
        __nextHasNoMarginBottom
      />

      {
        (supports.integrations) ? (
          <>
            <CheckboxControl
              label={ __( 'Plausible Analytics', 'badeggcup' ) }
              checked={ supports.integrationsPlausible }
              onChange={ ( value => setSupports({ ...supports, integrationsPlausible: value }) ) }
              __nextHasNoMarginBottom
            />
            <CheckboxControl
              label={ __( 'Fathom Analytics', 'badeggcup' ) }
              checked={ supports.integrationsFathom }
              onChange={ ( value => setSupports({ ...supports, integrationsFathom: value }) ) }
              __nextHasNoMarginBottom
            />
          </>
        ) : null
      }

      <CardDivider margin="4" />

      <Heading level={ 3 } size="13" >
        { __( 'Core Features', 'badeggcup' ) }
      </Heading>

      <CheckboxControl
        label={ __( 'Built-in Post Type', 'badeggcup' ) }
        checked={ supports.defaultPost }
        onChange={ ( value => {
          setSupports({ ...supports, defaultPost: value });

          if(!value) {
            setSupports({
              ...supports,
              defaultPost: false,
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
    </>
  );
}
