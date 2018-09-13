-- FUNCTION: public.get_empty_item()

-- DROP FUNCTION public.get_empty_item();

CREATE OR REPLACE FUNCTION public.get_empty_item(
	)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object('id', 0)

$BODY$;

ALTER FUNCTION public.get_empty_item()
    OWNER TO postgres;
