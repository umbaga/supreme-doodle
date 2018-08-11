-- FUNCTION: public.get_proficiencies(bigint)

-- DROP FUNCTION public.get_proficiencies(bigint);

CREATE OR REPLACE FUNCTION public.get_proficiencies(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$
SELECT json_build_object(
	'assigned', CASE WHEN get_proficiencies_assigned($1) IS NULL THEN '[]' ELSE get_proficiencies_assigned($1) END,
	'select', json_build_object(
		'category', CASE WHEN get_proficiencies_category($1) IS NULL THEN '[]' ELSE get_proficiencies_category($1) END,
		'list', CASE WHEN get_proficiencies_list($1) IS NULL THEN '[]' ELSE get_proficiencies_list($1) END
	)
)
$BODY$;

ALTER FUNCTION public.get_proficiencies(bigint)
    OWNER TO postgres;
