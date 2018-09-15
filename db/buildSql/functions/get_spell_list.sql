-- FUNCTION: public.get_spell_list(bigint)

-- DROP FUNCTION public.get_spell_list(bigint);

CREATE OR REPLACE FUNCTION public.get_spell_list(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'id', i.id,
		'name', i."itemName",
		'school', get_item(spell."schoolId"),
		'level', spell."spellLevel"
	)
) 
FROM adm_link lnk
LEFT OUTER JOIN adm_core_item i ON i.id = lnk."targetId"
INNER JOIN adm_def_spell spell ON spell."spellId" = i.id
WHERE lnk."typeId" = 5224
AND lnk."referenceId" = $1

$BODY$;

ALTER FUNCTION public.get_spell_list(bigint)
    OWNER TO postgres;
