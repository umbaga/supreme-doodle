-- FUNCTION: public.get_empty_dice()

-- DROP FUNCTION public.get_empty_dice();

CREATE OR REPLACE FUNCTION public.get_empty_dice(
	)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object(
	'id', 0,
	'dieCount', 0,
	'dieType', 0,
	'modifier', 0,
	'mutliplier', 1,
	'divisor', 1,
	'rendered', ''
)

$BODY$;

ALTER FUNCTION public.get_empty_dice()
    OWNER TO postgres;
