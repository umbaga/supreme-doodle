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
	'assigned', CASE WHEN get_proficiencies_assigned($1, 907) IS NULL THEN '[]' ELSE get_proficiencies_assigned($1, 907) END,
	'select', json_build_object(
		'category', CASE WHEN get_proficiencies_category($1, 905) IS NULL THEN '[]' ELSE get_proficiencies_category($1, 905) END,
		'list', CASE WHEN get_proficiencies_list($1, 906, 904) IS NULL THEN '[]' ELSE get_proficiencies_list($1, 906, 904) END
	),
	'variant', json_build_object(
		'gain', json_build_object(
			'assigned', CASE WHEN get_proficiencies_assigned($1, 2858) IS NULL THEN '[]' ELSE get_proficiencies_assigned($1, 2858) END,
			'select', json_build_object(
				'category', CASE WHEN get_proficiencies_category($1, 2863) IS NULL THEN '[]' ELSE get_proficiencies_category($1, 2863) END,
				'list', CASE WHEN get_proficiencies_list($1, 2860, 904) IS NULL THEN '[]' ELSE get_proficiencies_list($1, 2860, 904) END
			)
		),
		'lose', json_build_object(
			'assigned', CASE WHEN get_proficiencies_assigned($1, 2862) IS NULL THEN '[]' ELSE get_proficiencies_assigned($1, 2862) END,
			'select', json_build_object(
				'category', CASE WHEN get_link_array($1, 2864) IS NULL THEN '[]' ELSE get_link_array($1, 2864) END,
				'list', CASE WHEN get_link_array($1, 2861) IS NULL THEN '[]' ELSE get_link_array($1, 2861) END
			)
		)
	)
)
$BODY$;

ALTER FUNCTION public.get_proficiencies(bigint)
    OWNER TO postgres;
